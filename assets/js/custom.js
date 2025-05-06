// 处理个人卡片翻转功能
function setupProfileCardFlip() {
    const profileCard = document.querySelector('.profile-card-container');
    if (profileCard) {
        profileCard.addEventListener('click', function() {
            this.classList.toggle('flipped');
        });
        
        // 也处理移动设备上的触摸事件
        profileCard.addEventListener('touchend', function(e) {
            e.preventDefault();
            this.classList.toggle('flipped');
        });
    }
}

// 页面加载完成后初始化卡片翻转功能
document.addEventListener('DOMContentLoaded', function() {
    setupProfileCardFlip();
});