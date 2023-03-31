import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import {BrowserRouter} from 'react-router-dom';
import { Context } from '.';
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar';
import { check } from './http/userAPI';
import { fetchBrands, fetchDevices, fetchTypes } from "./http/deviceAPI";

const App = observer(() => {
  const {user, device} = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTypes().then(data => device.setTypes(data));
    fetchBrands().then(data => device.setBrands(data));
    fetchDevices(device.selectedBrand.id, device.selectedType.id, 4, device.selectedPage)
      .then(data => device.setDevices(data));

    check().then(data => {
      user.setUser({
        id: data.id, 
        email: data.email, 
        role: data.role,
        basketId: data.basketId
      });
      user.setIsAuth(true);
    }).finally(() => setLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Spinner animation='grow'/>
  }

  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
})

export default App;
