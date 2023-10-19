var express = require('express');

var app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}))
const mongoose = require('mongoose');


mongoose.connect('mongodb://127.0.0.1/student');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const StudentSchema = new Schema({
  id: String,
  name: String,
  s_class: String,
  gpa: String,
  address: String
}, {
    collection: 'info'
});
const StudentModel = mongoose.model('StudentModel', StudentSchema)

app.get('/', function (req, res) {
  StudentModel.find({})
  .then(data => res.json(data))
  .catch(err => res.status(500).json('loi sever'))
});
app.post('/', (req, res) => {
    var id = req.body.id
    var name = req.body.name
    var s_class = req.body.s_class
    var gpa = req.body.gpa
    var address = req.body.address
    StudentModel.create({
        id: id,
        name: name,
        s_class: s_class,
        gpa: gpa,
        address: address
    }).then((data) => {
        res.json('them sinh vien thanh cong')
    }).catch((err) => {
        res.status(500).json('them sinh vien that bai')
    })
})
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
