import {makeAutoObservable} from 'mobx';

export class UserStore {
    constructor() {
        this._isAuth = false;
        this._user = {};
        makeAutoObservable(this);   // привязка класса к mobx, чтобы при каждом изменении mobx мог перерендеривать изменения
                                    //  следовательно, надо подключать observer к компонентам, где меняются значения UserStore
    }

    setIsAuth(bool) {
        this._isAuth = bool;
    }
    setUser(user) {
        this._user = user;
    }

    get isAuth() {
        return this._isAuth;
    }
    get user() {
        return this._user;
    }
    get role() {
        return this._user.role;
    }
    get basketId() {
        return this._user.basketId;
    }
}