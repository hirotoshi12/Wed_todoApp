from flask import Flask, request
from flask_cors import CORS


# 自身の名称を app という名前でインスタンス化する
app = Flask(__name__)
CORS(app)

# 文字化け対策
app.config['JSON_AS_ASCII'] = False

todo_id = 0

todo = {
    'new': {},
    'end': {},
}

# タスクの一覧の取得(GET)...データの取得
@app.route('/tasks', methods=['GET'])
def get_tasks():
    status = request.args.get("status")
    if status == "new":
        return todo['new']
    elif status == "end":
        return todo['end']
    else:
        return {}

# タスクの追加(POST)...データの新規作成
@app.route('/tasks', methods=['POST'])
def post_tasks():
    global todo_id
    global todo
    todo_id += 1
    todo['new'][todo_id]  = request.get_json()['task']
    return {
        'id': todo_id,
        'content': todo['new'][todo_id]
    }

# タスクの完了(PUT)...データの更新
@app.route('/tasks/<int:task_id>', methods=['PUT'])
def put_tasks(task_id):
    todo['end'][task_id] = todo['new'].pop(task_id)
    return {task_id: todo['end'][task_id]}

# タスクの削除(DELETE)...データの削除
@app.route('/tasks/<int:task_id>', methods=['DELETE'])
def delete_tasks(task_id):
  # 1. pop関数を使って取得と削除を行う。
  remove_task = todo['new'].pop(task_id)
  # 2. return でpop関数から返ってきた値を返す
  return {task_id: remove_task}