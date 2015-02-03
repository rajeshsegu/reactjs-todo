var TodoModel = function () {
    this.todos = [];
    this.onChanges = [];
};

TodoModel.prototype.subscribe = function (onChange) {
    this.onChanges.push(onChange);
};

TodoModel.prototype.inform = function () {
    this.onChanges.forEach(function (cb) { cb(); });
};

TodoModel.prototype.add = function (todo) {
    this.todos.push(todo);
    this.inform();
};

TodoModel.prototype.remove = function (note) {
    this.todos = this.todos.filter(function (candidate) {
        return candidate !== note;
    });
    this.inform();
};

TodoModel.prototype.size = function () {
    return this.todos.length;
};

TodoModel.prototype.get = function (index) {
    return this.todos[index];
};



module.exports = TodoModel;
