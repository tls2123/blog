//mysql에서는 테이블이고 시퀄라이즈에서는 모델이라고 부른다.
//모델에서는 대문자로 저장이 되고 mysql에서는 소문자 복수로 저장이 된다.
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        //id 가 기본적으로 들어와있다.
        email: {
            type: DataTypes.STRING(30),
            allowNull: false, //필수'
            unique: true, //고유한 값
        },
        nickname: {
            type: DataTypes.STRING(30),
            allowNull: false, //필수
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false, //필수
        },
    }, {
        charset: 'utf8',
        collate: 'utf8_general_ci', //한글 저장
    });
    //관계를 넣어주는 곳
    User.associate = (db) => {
        db.User.hasMany(db.Post);
        db.User.hasMany(db.Comment);
        db.User.belongsToMany(db.Post, { through: 'Like' , as: 'Liked'});
    };
    return User;
}