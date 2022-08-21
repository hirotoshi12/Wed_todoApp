// add-btnというidを持つHTML要素を取得し、定数に代入する
const addBtn = document.getElementById('add-btn');
// （Task一覧）parent-listというidを持つHTML要素を取得し、定数に代入する
const parentList = document.getElementById('parent-list');

// (完了Task）complete-listというidを持つHTML要素を取得し、定数に代入する
const completeList = document.getElementById('complete-list');

// 関数の定義
async function init_list() {
  // ヒント1: ここは修正する必要はないけれど、response変数に何が入るか把握しよう
  let response = await (await fetch('http://localhost:5000/tasks?status=new', {method: 'GET', headers: {'Content-Type': 'application/json'}})).json();
  for (let key in response) {
    // ヒント2: ここも修正する必要はないけど、response変数の各要素のキーと値の取得方法を確認しましょう。そしてキーは「タスクID」、値は「taskの内容」という事を忘れず。
    console.log('key:' + key + ' value:' + response[key]);

    const childList = document.createElement('li');
    // （Task一覧）作成したli要素をul要素の子要素として末尾に追加
    parentList.appendChild(childList);

    const spantext = document.createElement('span');
    // 作成したli要素にテキストボックスの値を出力
    // ヒント3: ここは修正しましょう。response['content']は適切ではありません。ここは何を入れるべきでしょうか？
    spantext.textContent = response[key];

    // （Task一覧）作成したspan要素をli要素の子要素として末尾に追加
    childList.appendChild(spantext);

    // textboxの中身を空にする
    // ヒント4: 修正しましょう。たしか、このループの処理は画面が開いた時に実行されますよね？ そう考えると、この処理は....

    // btn.value = '';
      
    // ボタン要素を作成（削除）
    const deletebtn = document.createElement('button');
      
    // 作成したボタン名
    deletebtn.innerHTML = '削除';

    // 作成したbutton要素をli要素の子要素として末尾に追加
    childList.appendChild(deletebtn);
    
    // ボタン要素を作成する（完了）
    const completbtn = document.createElement('button');

    // 作成したボタン名（完了）
    completbtn.textContent = '完了';

    // 作成したbutton要素をli要素の子要素として末尾に追加する
    childList.appendChild(completbtn);
    
    
    // deletenbtn（削除）がクリックされた時の処理
    deletebtn.addEventListener('click', async() => {
      // ヒント5: ここも修正しましょう。response['id']は適切ではありません。response['id']の代わりになるものは？
      await fetch('http://localhost:5000/tasks/' +  key, {method: 'DELETE', headers: {'Content-Type': 'application/json'}});

      // deletebtnの親のli要素取得する
      const selectList = deletebtn.closest('li');
      // （Task一覧）deletebtnの親のli要素をul要素から削除する
      parentList.removeChild(selectList);
    })

    // // completbtnがクリックされた時の処理
    completbtn.addEventListener('click', async() => {
      // ヒント6: ここも修正しましょう。response['id']は適切ではありません。response['id']の代わりになるものは？
      await fetch('http://localhost:5000/tasks/' +  key, {method: 'PUT', headers: {'Content-Type': 'application/json'}});

      // 1.（Task一覧）完了ボタンの親のli要素を取得する closest
      const parentList_li = completbtn.closest('li');

      console.log(parentList_li.textContent);
      console.log(parentList_li.innerHTML);
    
      // 3.(完了Task）li要素を作成する
      const afterList = document.createElement('li');

      // 4.(完了Task）作成したli要素のテキストに、先ほど取得した親のli要素のテキストをセットする
      const parentList_li_span = parentList_li.firstElementChild;
      console.log(parentList_li_span);

      afterList.textContent = parentList_li_span.textContent;

      // 5.(完了Task）作成したli要素を完了一覧のul要素の子要素として追加する   appendChild
      completeList.appendChild(afterList);

      // 6.（Task一覧）完了ボタンの親のli要素を未完了一覧のul要素から削除 removeChild
      parentList.removeChild(parentList_li);

    });
  }
  // ヒント1: ここは修正する必要はないけれど、response変数に何が入るか把握しよう
  response = await (await fetch('http://localhost:5000/tasks?status=end', {method: 'GET', headers: {'Content-Type': 'application/json'}})).json();
  for (let key in response) {
    // ヒント2: ここも修正する必要はないけど、response変数の各要素のキーと値の取得方法を確認しましょう。そしてキーは「タスクID」、値は「taskの内容」という事を忘れず。
    console.log('key:' + key + ' value:' + response[key]);
  // 1.（Task一覧）完了ボタンの親のli要素を取得する closest
  
  // 3.(完了Task）li要素を作成する
  const afterList = document.createElement('li');

  // 4.(完了Task）作成したli要素のテキストに、先ほど取得した親のli要素のテキストをセットする
 
  afterList.textContent = response[key];

  // 5.(完了Task）作成したli要素を完了一覧のul要素の子要素として追加する   appendChild
  completeList.appendChild(afterList);}
}

init_list();

// HTML要素がクリックされたときにイベント処理を実行
addBtn.addEventListener('click', async() => {

// textboxの値の長さが０より大きい場合
  if (btn.value.length > 0) {
    // 修正前 let response = await (await fetch('http://localhost:5000/tasks', {method: 'POST', body: JSON.stringify({'task': btn.value})}).json());
    const response = await (await fetch('http://localhost:5000/tasks', {method: 'POST', body: JSON.stringify({'task': btn.value}), headers: {'Content-Type': 'application/json'}})).json();
    // li要素を新しく作成する
    const childList = document.createElement('li');
    // （Task一覧）作成したli要素をul要素の子要素として末尾に追加
    parentList.appendChild(childList);

    const spantext = document.createElement('span');
    // 作成したli要素にテキストボックスの値を出力
    spantext.textContent = response['content'];

    // （Task一覧）作成したspan要素をli要素の子要素として末尾に追加
    childList.appendChild(spantext);

    
    

    // textboxの中身を空にする
    btn.value = '';
    
    // ボタン要素を作成（削除）
    const deletebtn = document.createElement('button');
      
    // 作成したボタン名
    deletebtn.innerHTML = '削除';

    // 作成したbutton要素をli要素の子要素として末尾に追加
    childList.appendChild(deletebtn);
    
    // ボタン要素を作成する（完了）
    const completbtn = document.createElement('button');

    // 作成したボタン名（完了）
    completbtn.textContent = '完了';

    // 作成したbutton要素をli要素の子要素として末尾に追加する
    childList.appendChild(completbtn);
    
    // deletenbtn（削除）がクリックされた時の処理
    deletebtn.addEventListener('click', async() => {
      await fetch('http://localhost:5000/tasks/' +  response['id'] , {method: 'DELETE', headers: {'Content-Type': 'application/json'}});

      // deletebtnの親のli要素取得する
      const selectList = deletebtn.closest('li');
      // （Task一覧）deletebtnの親のli要素をul要素から削除する
      parentList.removeChild(selectList);
    })

    // // completbtnがクリックされた時の処理
    completbtn.addEventListener('click', async() => {
      await fetch('http://localhost:5000/tasks/' +  response['id'] , {method: 'PUT', headers: {'Content-Type': 'application/json'}});

      // 1.（Task一覧）完了ボタンの親のli要素を取得する closest
      const parentList_li = completbtn.closest('li');

      console.log(parentList_li.textContent);
      console.log(parentList_li.innerHTML);
    
      // 3.(完了Task）li要素を作成する
      const afterList = document.createElement('li');

      // 4.(完了Task）作成したli要素のテキストに、先ほど取得した親のli要素のテキストをセットする
      const parentList_li_span = parentList_li.firstElementChild;
      console.log(parentList_li_span);

      afterList.textContent = parentList_li_span.textContent;

      // 5.(完了Task）作成したli要素を完了一覧のul要素の子要素として追加する   appendChild
      completeList.appendChild(afterList);

      // 6.（Task一覧）完了ボタンの親のli要素を未完了一覧のul要素から削除 removeChild
      parentList.removeChild(parentList_li);

    })

  }
});

