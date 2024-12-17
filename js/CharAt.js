//キーワードの1文字目に関連するワードを表示する

const searchWordText = document.querySelector('#search-word-input');
const prefectureList = document.querySelectorAll('#prefecture-list button');

searchWordText.addEventListener('keyup', () => {
    const searchWord = searchWordText.value;
    
    prefectureList.forEach((element) => {
        if (!searchWord || searchWord === '') {
            element.classList.remove('hide');
            return;
        }

        const prefectureName = element.dataset.name;
        const phonetic = element.dataset.phonetic;
        if (searchWord.charAt(0) === prefectureName.charAt(0) || searchWord.charAt(0) === phonetic.charAt(0)) {
            element.classList.remove('hide');
        } else {
            element.classList.add('hide');
        }
    });
});
