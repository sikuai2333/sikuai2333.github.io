import os
import sys
import toml
import yaml
import glob
import os.path

def convert_toml_to_yaml(toml_path):
    """Convert a TOML file to YAML and delete the original."""
    # Get the filename without extension
    base_path = os.path.splitext(toml_path)[0]
    yaml_path = base_path + '.yaml'
    
    # Read the TOML file
    try:
        with open(toml_path, 'r', encoding='utf-8') as f:
            toml_data = toml.load(f)
    except Exception as e:
        print(f"Error reading {toml_path}: {e}")
        return False
        
    # Write the YAML file
    try:
        with open(yaml_path, 'w', encoding='utf-8') as f:
            yaml.dump(toml_data, f, allow_unicode=True, sort_keys=False, default_flow_style=False)
        print(f"Converted {toml_path} to {yaml_path}")
    except Exception as e:
        print(f"Error writing {yaml_path}: {e}")
        return False
    
    # Delete the original TOML file
    try:
        os.remove(toml_path)
        print(f"Deleted original file {toml_path}")
    except Exception as e:
        print(f"Error deleting {toml_path}: {e}")
        return False
        
    return True

def main():
    # Get the directory path from command line argument
    if len(sys.argv) < 2:
        print("Usage: python convert_toml_to_yaml.py <directory_path>")
        sys.exit(1)
    
    directory = sys.argv[1]
    
    # Find all TOML files
    toml_files = glob.glob(os.path.join(directory, "*.toml"))
    
    if not toml_files:
        print(f"No TOML files found in {directory}")
        return
    
    # Convert each file
    success_count = 0
    for toml_file in toml_files:
        if convert_toml_to_yaml(toml_file):
            success_count += 1
    
    print(f"Converted {success_count} out of {len(toml_files)} files.")

if __name__ == "__main__":
    main() 