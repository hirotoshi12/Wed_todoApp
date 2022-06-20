from flask import Flask

app = Flask(__name__)


# タスクの一覧の取得(GET)...データの取得
@app.route('/tasks', methods=['GET'])
def get_tasks():
  return {}
# 'GET':'データの取得'

# タスクの追加(POST)...データの新規作成
@app.route('/tasks', methods=['POST'])
def post_tasks():
  return {}
# 'POST':'データの新規作成'

# タスクの完了(PUT)...データの更新
@app.route('/tasks', methods=['PUT'])
def put_tasks():
  return {}
# 'PUT':'データの更新'

# タスクの削除(DELETE)...データの削除
@app.route('/tasks/<task_id>', methods=['DELETE'])
def delete_tasks():
  return {}
# 'DELETE':'データの削除'