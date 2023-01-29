export class UserInfo {
  constructor(id, name, job, avatar) {
    this._id = id; //profile
    this._name = name; //nameText
    this._job = job; // jobText
    this._avatar = avatar; // profilePhoto
  }

  // getUserInfo() { // публичный метод, который возвращает данные пользователя
  //   this.id = this._id.id; // profile.id
  //   this.name = this._name.textContent; // nameText.textContent
  //   this.job = this._job.textContent; // jobText.textContent
  //   this.avatar = this._avatar.src; // profilePhoto.src
  //   return this;
  // }

  setUserInfo(data) {
    this._id.id = data._id;
    this._name.textContent = data.name;
    this._job.textContent = data.about;
    this._avatar.src = data.avatar;
  }
}