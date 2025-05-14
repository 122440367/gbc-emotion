        // 动态加载图片数据
        document.addEventListener('DOMContentLoaded', function () {
            const gallery = document.querySelector('.image-gallery');
            const searchInput = document.getElementById('searchInput');
            const searchBtn = document.getElementById('searchBtn');
            const clearInputBtn = document.getElementById('clearInputBtn');
            const page = 1;
            const limit = 99999;

            // 加载图片函数，支持关键词
            function loadImages(keyword = '') {
                gallery.innerHTML = '<div class="loading">图片加载中...</div>';
                let url = `/api/images?page=${page}&limit=${limit}`; 
                if (keyword.trim()) {
                    url += `&keyword=${encodeURIComponent(keyword.trim())}`;
                }
                fetch(url)
                    .then(response => {
                        if (!response.ok) throw new Error(`HTTP错误! 状态码: ${response.status}`);
                        return response.json();
                    })
                    .then(data => {
                        if (data.code !== 0) throw new Error('API返回错误');
                        gallery.innerHTML = '';
                        if (!data.data.length) {
                            gallery.innerHTML = '<div class="error">没有找到相关图片</div>';
                            return;
                        }
                        data.data.forEach(image => {
                            const item = document.createElement('div');
                            item.className = 'gallery-item';
                            item.innerHTML = `
                                <div class="image-wrap">
                                    <img src="${image.url}" 
                                         alt="${image.alt}" 
                                         loading="lazy"
                                         width="${image.width}"
                                         height="${image.height}">
                                    <div class="image-actions">
                                        <img src="./src/download.svg" class="action-btn download-btn" title="下载">
                                        <img src="./src/copy.svg" class="action-btn copy-btn" title="复制链接">
                                    </div>
                                </div>
                                <div class="image-caption">${image.caption}</div>
                            `;
                            gallery.appendChild(item);

                            // 下载按钮事件
                            item.querySelector('.download-btn').onclick = function(e) {
                                e.stopPropagation();
                                const link = document.createElement('a');
                                link.href = image.url;
                                link.download = image.alt || 'image';
                                document.body.appendChild(link);
                                link.click();
                                document.body.removeChild(link);
                            };
                            // 复制按钮事件
                            item.querySelector('.copy-btn').onclick = function(e) {
                                e.stopPropagation();
                                // 拼接为完整链接
                                let fullUrl = image.url.startsWith('http') ? image.url : (location.origin + image.url);
                                navigator.clipboard.writeText(fullUrl).then(() => {
                                    this.title = "已复制";
                                    setTimeout(() => { this.title = "复制链接"; }, 1000);
                                });
                            };
                        });
                    })
                    .catch(error => {
                        console.error('加载失败:', error);
                        gallery.innerHTML = `
                            <div class="error">
                                <p>图片加载失败</p>
                                <small>${error.message}</small>
                            </div>
                        `;
                    });
            }

            // 初始加载全部图片
            loadImages();

            // 搜索按钮点击事件
            searchBtn.addEventListener('click', function () {
                loadImages(searchInput.value);
            });

            // 小叉号点击事件
            clearInputBtn.addEventListener('click', function () {
                searchInput.value = '';
                clearInputBtn.style.display = 'none';
                loadImages();
                searchInput.focus();
            });

            // 输入框内容变化时显示/隐藏小叉号
            searchInput.addEventListener('input', function () {
                if (searchInput.value.trim() === '') {
                    clearInputBtn.style.display = 'none';
                    loadImages();
                } else {
                    clearInputBtn.style.display = '';
                }
            });

            // 输入框回车事件
            searchInput.addEventListener('keydown', function (e) {
                if (e.key === 'Enter') {
                    loadImages(searchInput.value);
                }
            });
    });