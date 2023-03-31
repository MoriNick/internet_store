import {makeAutoObservable} from 'mobx';

export class DeviceStore {
    constructor() {
        this._types = []
        this._brands = []
        this._devices = {count: 0, arr: []}
        this._selectedType = {};
        this._selectedBrand = {};
        this._selectedPage = 1;
        makeAutoObservable(this);   // привязка класса к mobx, чтобы при каждом изменении mobx мог перерендеривать изменения
                                    // следовательно, надо подключать observer к компонентам, где меняются значения UserStore
    }

    setTypes(types) {
        this._types = types;
    }
    setBrands(brands) {
        this._brands = brands;
    }
    setDevices(devices) {
        this._devices.arr = devices.rows;
        this._devices.count = devices.count;
    }
    setSelectedPage(page) {
        this._selectedPage = page;
    }
    setSelectedType(type) {
        this.setSelectedPage(1);
        if (type === this._selectedType)
            this._selectedType = {};
        else
            this._selectedType = type;
    }
    setSelectedBrand(brand) {
        this.setSelectedPage(1);
        if (brand === this._selectedBrand)
            this._selectedBrand = {};
        else
            this._selectedBrand = brand;
    }

    get types() {
        return this._types;
    }
    get brands() {
        return this._brands;
    }
    get devices() {
        return this._devices.arr;
    }
    get devicesCount() {
        return this._devices.count;
    }
    get selectedType() {
        return this._selectedType;
    }
    get selectedBrand() {
        return this._selectedBrand;
    }
    get selectedPage() {
        return this._selectedPage;
    }
}