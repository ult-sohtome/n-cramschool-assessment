'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivision = document.getElementById('result-area');
const tweetDivision = document.getElementById('tweet-area');

assessmentButton.onclick = () => {
  const userName =userNameInput.value;
  if(userName.length === 0){
    return; //名前が空の時は関数の処理を終了する
  }

  resultDivision.innerText = '';
  tweetDivision.innerText = '';

  const headerDivision = document.createElement('div');
  headerDivision.setAttribute('class', 'card-header text-bg-primary');
  headerDivision.innerText = '診断結果';

  const bodyDivision = document.createElement('div');
  bodyDivision.setAttribute('class', 'card-body');

  const paragraph = document.createElement('p');
  paragraph.setAttribute('class', 'card-text');
  const result = assessment(userName);
  paragraph.innerText = result;
  bodyDivision.appendChild(paragraph);

  resultDivision.setAttribute('class', 'card');

  resultDivision.appendChild(headerDivision);
  resultDivision.appendChild(bodyDivision);


  const anchor = document.createElement('a');
  const hrefValue = "https://twitter.com/intent/tweet?button_hashtag=あなたの良いところ診断&ref_src=twsrc%5Etfw";

  anchor.setAttribute('href', hrefValue);
  anchor.setAttribute('class', "twitter-hashtag-button");
  anchor.setAttribute('data-text', result);
  anchor.setAttribute('data-show-count', "false");
  anchor.innerText = 'Tweet #あなたの良いところ診断';

  const script = document.createElement('script');
  const src = "https://platform.twitter.com/widgets.js";

  script.setAttribute('defer', true);
  script.setAttribute('src', src);
  script.setAttribute('charset', 'utf-8');

  tweetDivision.appendChild(anchor);
  tweetDivision.appendChild(script);
}

const answers = [
  '###userName###のいいところは声です。###userName###の特徴的な声は皆を惹きつけ、心に残ります。',
  '###userName###のいいところはまなざしです。###userName###に見つめられた人は、気になって仕方がないでしょう。',
  '###userName###のいいところは情熱です。###userName###の情熱に周りの人は感化されます。',
  '###userName###のいいところは厳しさです。###userName###の厳しさがものごとをいつも成功に導きます。',
  '###userName###のいいところは知識です。博識な###userName###を多くの人が頼りにしています。',
  '###userName###のいいところはユニークさです。###userName###だけのその特徴が皆を楽しくさせます。',
  '###userName###のいいところは用心深さです。###userName###の洞察に、多くの人が助けられます。',
  '###userName###のいいところは見た目です。内側から溢れ出る###userName###の良さに皆が気を惹かれます。',
  '###userName###のいいところは決断力です。###userName###がする決断にいつも助けられる人がいます。',
  '###userName###のいいところは思いやりです。###userName###に気をかけてもらった多くの人が感謝しています。',
  '###userName###のいいところは感受性です。###userName###が感じたことに皆が共感し、わかりあうことができます。',
  '###userName###のいいところは節度です。強引すぎない###userName###の考えに皆が感謝しています。',
  '###userName###のいいところは好奇心です。新しいことに向かっていく###userName###の心構えが多くの人に魅力的に映ります。',
  '###userName###のいいところは気配りです。###userName###の配慮が多くの人を救っています。',
  '###userName###のいいところはその全てです。ありのままの###userName###自身がいいところなのです。',
  '###userName###のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる###userName###が皆から評価されています。'
];

// let sumOfCharCode = 0;

function assessment(userName) {
  let sumOfCharCode = 0;
  for(let i = 0; i < userName.length; i++) {
    sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
  }

  const index = sumOfCharCode % answers.length;
  let result = answers[index];

  result = result.replaceAll('###userName###', userName);
  return result;
}

console.assert(
  assessment('太郎') === '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
  '診断結果の文言が間違っています。名前の置き換え処理が正しくありません。'
);
console.assert(
  assessment('太郎') === assessment('太郎'),
  '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
);

console.assert(
  assessment('あいう') === assessment('あいう'),
  '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
);


userNameInput.onkeydown = event => {
  if(event.key === 'Enter') {
    assessmentButton.onclick();
  }
}