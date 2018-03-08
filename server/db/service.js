export class DbService {
    constructor(model, key) {
        // mimic private field by keeping inside a class constructor
        // rather than attaching to the object
        var _errMsg = {}
        this.setError = function (errMsg) {_errMsg = errMsg}
        this.checkError = function () {_errMsg === null}
        this.model = model;
        this.key = key;
    }

    createInstance(info) {
        var instance = new this.model(info);

        var err = instance.validateSync();
        if (err) {
            setError(err.message)
        } else {
            this.model.where(this.key, info[this.key]).exec(function (err, docs) {
                if (err) {
                    setError(err.message)
                } else if (docs.length) {
                    setError("already exists")
                }
            })
        }
        if (!checkError) {
            instance.save(function (err, docs) {
                if (err) {
                    setError(err.message)
                }
            })
        }
    }
}

export class UserService extends DbService {
    constructor (model) {
        super(model,"username")
    }
}
