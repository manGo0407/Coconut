import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import LoginForm from '../components/LoginForm/LoginForm';

const url = import.meta.env.VITE_APP_URL;

export const userRegister = createAsyncThunk(
  'user/register',
  async ({ payload, pic }, { rejectWithValue }) => {
    if (pic) {
      const formData = new FormData();
      formData.append('image', pic);
      formData.append('rest', JSON.stringify(payload));
      const response = await axios.post(
        `${url}/users/register/multer`,
        formData,
        {
          withCredentials: true,
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      if (response.data.error) {
        return rejectWithValue(response.data.error);
      }
      return response.data;
    } else {
      const response = await axios.post(`${url}/users/register`, payload, {
        withCredentials: true,
      });
      if (response.data.error) {
        return rejectWithValue(response.data.error);
      }
      return response.data;
    }
  }
);

export const userLogin = createAsyncThunk(
  'user/login',
  async (payload, { rejectWithValue }) => {
    const response = await axios.post(`${url}/users/login`, payload, {
      withCredentials: true,
    });
    if (response.data.error) {
      return rejectWithValue(response.data.error);
    }

    return response.data;
  }
);

export const userLogout = createAsyncThunk('user/logout', async () => {
  // console.log('Я логаут');
  const response = await axios.get(`${url}/users/logout`, {
    withCredentials: true,
  });
  return response.data;
});

export const userCheckSession = createAsyncThunk(
  'user/checksession',
  async () => {
    const response = await axios.get(`${url}/users/checkSession`, {
      withCredentials: true,
    });
    return response.data;
  }
);

export const allTours = createAsyncThunk('tours/all', async () => {
  const response = await axios.get(`${url}/tours`, {
    withCredentials: true,
  });
  return response.data;
});

export const authorTour = createAsyncThunk('tours/author', async (id) => {
  const response = await axios.get(`${url}/tours/ownerId/${id}`, {
    withCredentials: true,
  });

  if (response.status === 200) {
   return response.data
  }
});

export const tourEdit = createAsyncThunk(
  'tours/update',
  async ({ res, id, pic }) => {
    if (pic) {
      const formData = new FormData();
      formData.append('image', pic);
      formData.append('rest', JSON.stringify(res));
      const response = await axios.put(`${url}/tours/multer/${id}`, formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } else {
      console.log('попали сюда');
      const response = await axios.put(`${url}/tours/${id}`, res, {
        withCredentials: true,
      });
      return response.data;
    }
  }
);

export const tourAccept = createAsyncThunk('tours/accept', async (id) => {
  // console.log('попали сюда');
  const response = await axios.patch(`${url}/tours/${id}`)
  return response.data;
});

export const tourDelete = createAsyncThunk('tours/delete', async (id) => {
  const response = await axios.delete(`${url}/tours/${id}`, {
    withCredentials: true,
  });

  if (response.status === 200) {
    return id;
  }
});

export const addTour = createAsyncThunk(
  'tour/new',
  async ({ payload, pic, coords }, { rejectWithValue }) => {
    if (pic) {
      const formData = new FormData();
      formData.append('image', pic);
      formData.append('rest', JSON.stringify(payload));
      formData.append('coords', JSON.stringify(coords));
      const response = await axios.post(`${url}/tours/new/multer`, formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (response.data.error) {
        console.log('popali v data error thunk');
        console.log(response.data.error);
        return rejectWithValue(response.data.error);
      }
      toast.success("Тур Создан! После модерации Ваш тур будет доступен к бронированию!")
      return response.data;
    } else {
      const response = await axios.post(
        `${url}/tours/new`,
        { payload, coords },
        {
          withCredentials: true,
        }
      );
      if (response.data.error) {
        // console.log('popali v data error thunk');
        // console.log(response.data.error);
        return rejectWithValue(response.data.error);
      }
      return response.data;
    }
  }
);

export const allComments = createAsyncThunk('comments/all', async (id) => {
  const response = await axios.get(`${url}/comments/${id}`, {
    withCredentials: true,
  });
});

export const orderCreate = createAsyncThunk(
  'orders/new',
  async ({ id, userId, peoples, firstName, lastName }) => {
    // console.log(id, userId, peoples, firstName, lastName);
    const response = await axios.post(
      `${url}/orders/${id}`,
      { id, userId, peoples, firstName, lastName },
      { withCredentials: true }
    );
    console.log(response.data);
    return response.data.order;
  }
);

export const oneOrder = createAsyncThunk('order/one', async (id) => {
  const response = await axios.get(`${url}/orders/${id}`, {
    withCredentials: true,
  });
  // console.log(response.data);
  return response.data;
});


export const userUpdate = createAsyncThunk(
  'user/update',
  async ({ res, pic }) => {
    if (pic) {
      const formData = new FormData();
      formData.append('image', pic);
      formData.append('rest', JSON.stringify(res));
      const response = await axios.put(
        `${url}/users/multer/changes`,
        formData,
        {
          withCredentials: true,
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      return response.data;
    } else {
      const response = await axios.put(`${url}/users/changes`, res, {
        withCredentials: true,
      });
      return response.data;
    }
  }
);

export const allOrders = createAsyncThunk('order/all', async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_APP_URL}/profile/all`,
    {
      withCredentials: true,
    }
  );
  console.log('vot on',response);
  return response.data;
});

export const deleteOrder = createAsyncThunk('order/delete', async (id) => {
  const response = await axios.delete(
    `${import.meta.env.VITE_APP_URL}/orders/${id}`
  );
  return response.data;
});

export const accepteOrder = createAsyncThunk('order/accept', async (id) => {
  const response = await axios.patch(
    `${import.meta.env.VITE_APP_URL}/orders/${id}`
  );
  return response.data
})

export const resetPassword = createAsyncThunk('password/reset', async({email}) =>{
  console.log(email);
  
  const response = await axios.post(
    `${import.meta.env.VITE_APP_URL}/reset`,{email}
  );
  return response.data
})

export const newPassword = createAsyncThunk('newPassword/create', async({token, password}) =>{
  // console.log(token, password);
  
  const response = await axios.post(
    `${import.meta.env.VITE_APP_URL}/newPassword/${token}`,{password, token}
  );
  return response.data
})

