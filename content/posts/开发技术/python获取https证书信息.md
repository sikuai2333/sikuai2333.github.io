---
title: python获取https证书信息
date: 2024-01-12
categories:
  - 开发技术
tags:
  - blog
  - 开发技术
lastmod: 2025-05-06T00:30:12.499Z
---
```python3
# -*- coding: utf-8 -*-
 
import os
import time
import sys
import idna
import re
import subprocess
from subprocess import Popen, PIPE, STDOUT
from socket import socket
import OpenSSL
from OpenSSL import SSL
from urllib import parse
from dateutil import parser
import traceback
import json
import tldextract
 
 
# from share.logfile.SecniumLogger import logger
# import logging as logger
 
 
class CertInfo(object):
    def __init__(self, domain):
        self.domain_head = domain
        self.domain = domain.lstrip("https:").strip("/")
        self.cert = None
        self.certs = None
        self.results = {"Parameter": domain, "source": "openssl"}
        # self.certfile_path = "/tmp/certfile.crt"
        self.certfile_path = "certfile.crt"
 
    def get_info(self):
        res = self.get_certificate(self.domain)
        if res:
            res = self.get_cert_fingerprint(self.certs, self.certfile_path)
        if res:
            res = self.get_cert_info(self.cert)
        if res:
            self.get_cert_CA()
 
        if not self._Is_domain_cert_effective():
            return {}
 
        return self.results
 
    """判断证书是否与域名匹配有效"""
    def _Is_domain_cert_effective(self):
        try:
            val = tldextract.extract(self.domain_head)
            if "DNS_Names" in self.results:
                if not val.registered_domain in self.results["DNS_Names"]:
                    return False
        except Exception as e:
            print("Cert is domain cert effective error:{0}, line number:{1}".format(str(e), e.__traceback__.tb_lineno))
            return False
        return True
 
    def get_cert_CA(self):
        if self.results["CommonName"] == self.results["Names"]:
            self.results["CA"] = False
        else:
            self.results["CA"] = True
 
    def get_cert_fingerprint(self, certs, certfile_path):
        try:
            cert_components = dict(self.certs[0].get_subject().get_components())
            if (sys.version_info[0] >= 3):
                cn = (cert_components.get(b'CN')).decode('utf-8')
            else:
                cn = cert_components.get('CN')
 
            try:
                temp_certname = certfile_path
                with open(temp_certname, 'w+') as output_file:
                    if (sys.version_info[0] >= 3):
                        output_file.write((OpenSSL.crypto.dump_certificate(OpenSSL.crypto.FILETYPE_PEM,
                                                                           self.certs[0]).decode('utf-8')))
                    else:
                        output_file.write((OpenSSL.crypto.dump_certificate(OpenSSL.crypto.FILETYPE_PEM, self.certs[0])))
            except Exception as e:
                # logger.error("DownLoad cert error:{0}, line number:{1}".format(str(e), e.__traceback__.tb_lineno))
                print("DownLoad cert error:{0}, line number:{1}".format(str(e), e.__traceback__.tb_lineno))
                return False
 
            cmds = {
                "MD5": "openssl x509 -fingerprint -md5 -in",
                "SHA1": "openssl x509 -fingerprint -sha1 -in",
                "SHA-256": "openssl x509 -fingerprint -sha256 -in"
            }
            regular = "Fingerprint=(.*)\n"
            if not self.get_openssl_command(certfile_path, cmds, regular):
                return False
 
            # os.remove(certfile_path)
            return True
        except Exception as e:
            # logger.error("Get cert fingerprint error:{0}, line number:{1}".format(str(e), e.__traceback__.tb_lineno))
            print("Get cert fingerprint error:{0}, line number:{1}".format(str(e), e.__traceback__.tb_lineno))
            return False
 
    def get_openssl_command(self, certfile_path, cmds, regular):
        result = {}
 
        for key, cmd in cmds.items():
            try:
                cmd = '{0} {1}'.format(cmd, certfile_path)
                proc = subprocess.Popen(cmd, shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
                buff = proc.communicate()[0].decode()
                stritem = re.findall(regular, buff)
                if len(stritem) > 1:
                    result[key] = []
                    for i in range(len(stritem)):
                        result[key].append(stritem[i])
                elif len(stritem) == 1:
                    result[key] = stritem[0].replace(":", "")
            except Exception as e:
                # logger.error("Get openssl command error:{0}, line number:{1}".format(str(e), e.__traceback__.tb_lineno))
                print("Get openssl command error:{0}, line number:{1}".format(str(e), e.__traceback__.tb_lineno))
                return False
        self.results.update(result)
        return True
 
    def get_certificate(self, hostname, port=443):
        try:
            sock = socket()
            # sock.settimeout(10)   # 不要开启
            sock.setblocking(True)  # 关键
            sock.connect((hostname, port), )
            ctx = SSL.Context(SSL.SSLv23_METHOD)
            ctx.check_hostname = False
            ctx.verify_mode = SSL.VERIFY_NONE
 
            sock_ssl = SSL.Connection(ctx, sock)
            sock_ssl.set_tlsext_host_name(idna.encode(hostname))  # 关键: 对应不同域名的证书
            sock_ssl.set_connect_state()
            sock_ssl.do_handshake()
 
            self.cert = sock_ssl.get_peer_certificate()
            self.certs = sock_ssl.get_peer_cert_chain()  # 下载证书
            sock_ssl.close()
            sock.close()
 
            return True
        except Exception as e:
            # logger.error("Get certificate error:{0}, line number:{1}".format(str(e), e.__traceback__.tb_lineno))
            print("Get certificate error:{0}, line number:{1}".format(str(e), e.__traceback__.tb_lineno))
            return False
 
    def get_cert_info(self, cert):
        result = {}
 
        try:
            certIssue = cert.get_issuer()
 
            result["Names"]               = cert.get_subject().CN
            result["Version"]             = "v" + str(cert.get_version() + 1)
            result["Serial_Number"]       = str(cert.get_serial_number())
            result["Serial_Hex"]          = hex(cert.get_serial_number())
            result["Signature_Algorithm"] = cert.get_signature_algorithm().decode("UTF-8")
 
            """Issuer"""
            for item in certIssue.get_components():
                if item[0].decode("utf-8") == "C":
                    result["Country"] = item[1].decode("utf-8")
                if item[0].decode("utf-8") == "O":
                    result["Organization"] = item[1].decode("utf-8")
                if item[0].decode("utf-8") == "OU":
                    result["Organizational_Unit"] = item[1].decode("utf-8")
                if item[0].decode("utf-8") == "CN":
                    result["CommonName"] = item[1].decode("utf-8")
 
            """Validity"""
            datetime_struct = parser.parse(cert.get_notBefore().decode("UTF-8"))
            result["Not_Before"] = str(datetime_struct.strftime('%Y-%m-%d %H:%M:%S')) + " UTC"
            datetime_struct = parser.parse(cert.get_notAfter().decode("UTF-8"))
            result["Not_After"] = str(datetime_struct.strftime('%Y-%m-%d %H:%M:%S')) + " UTC"
            result["Is_Expired"] = cert.has_expired()
 
            """Subject Public Key Info"""
            result["Public_Key_Bits"] = cert.get_pubkey().bits()
            result["Public_Key"] = OpenSSL.crypto.dump_publickey(OpenSSL.crypto.FILETYPE_PEM, cert.get_pubkey()).decode(
                "utf-8")
 
            """Public Modulus"""
            cmd_modulus = {"Public_Key_Modulus": "openssl x509 -modulus -in"}
            regular = "Modulus=(.*)\n"
            if not self.get_openssl_command(self.certfile_path, cmd_modulus, regular):
                return False
            tmp_modulus_list = list(self.results["Public_Key_Modulus"])
            for i in range(0, len(self.results["Public_Key_Modulus"]) * 2, 3):
                tmp_modulus_list.insert(i, ":")
            result["Public_Key_Modulus"] = "".join(tmp_modulus_list).strip(":")
 
            """DNS Names"""
            cmd_dns = {"DNS_Names": "openssl x509 -text -in"}
            regular = "DNS:(.*?)[,\s]"
            # regular = "Alternative Name:(.*)X509v3 Extended"
            if not self.get_openssl_command(self.certfile_path, cmd_dns, regular):
                return False
        except Exception as e:
            # logger.error("Get Cert Info:{0}, line number:{1}".format(str(e), e.__traceback__.tb_lineno))
            print("Get Cert Info:{0}, line number:{1}".format(str(e), e.__traceback__.tb_lineno))
            return False
 
        self.results.update(result)
        return True
 
 
def run(url):
    if not "https://" in url:
        return {}
    return CertInfo(url).get_info()
 
 
if __name__ == "__main__":
    # url = 'https://ugc.movie.meituan.com/'
    #url = 'web.chacuo.net'
    # url = "https://www.baidu.com/"
    #url = 'https://58.22.3.168/'   # 自签
    #url = 'https://212.205.123.146/'   # 自签
    #url = 'https://157.122.176.67/'
    if len(sys.argv) != 2:
        print({})
    url = sys.argv[1]
    print("-------------------")
    print(json.dumps(run(url)))
    print("-------------------")

    """
    cert = get_certificate(url)
    print(url)
    certIssue = cert.get_issuer()
    print("证书版本:            ",cert.get_version() + 1)
    print("证书序列号:          ",hex(cert.get_serial_number()))
    print("证书中使用的签名算法: ",cert.get_signature_algorithm().decode("UTF-8"))
    print("颁发者:              ",certIssue.commonName)
    datetime_struct = parser.parse(cert.get_notBefore().decode("UTF-8"))
    print("有效期从:             ",datetime_struct.strftime('%Y-%m-%d %H:%M:%S'))
    datetime_struct = parser.parse(cert.get_notAfter().decode("UTF-8"))
    print("到:                   ",datetime_struct.strftime('%Y-%m-%d %H:%M:%S'))
    print ("证书是否已经过期:      ",cert.has_expired())
    print("公钥长度" ,cert.get_pubkey().bits())
    print("公钥:\n" ,OpenSSL.crypto.dump_publickey(OpenSSL.crypto.FILETYPE_PEM, cert.get_pubkey()).decode("utf-8"))
    print("主体信息:")
    print("CN : 通用名称  OU : 机构单元名称")
    print("O  : 机构名    L  : 地理位置")
    print("S  : 州/省名   C  : 国名")
    for item in certIssue.get_components():
        print(item[0].decode("utf-8"), "  ——  ",item[1].decode("utf-8"))
    print(cert.get_extension_count())
    """
```
