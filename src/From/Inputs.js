/*
  * FILE THE INPUTS
*/

module.exports = {
  register:[
    {
      name: 'fs_username',
      label: 'Username',
      type: 'text',
      id: 'fs-register-username',
      description: 'number, letters, character specials'
    },
    {
      name: 'fs_fullname',
      label: 'Fullname',
      type: 'text',
      id: 'fs-register-fullname',
      description: 'letters'
    },
    {
      name: 'fs_email',
      label: 'Email',
      type: 'email',
      id: 'fs-register-email',
      description: 'Email valid'
    },
    {
      name: 'fs_age',
      label: 'Age',
      type: 'number',
      id: 'fs-register-age',
      description: 'to be of years (18 years)'
    },
    {
      name: 'fs_password',
      label: 'Password',
      type: 'password',
      id: 'fs-register-password',
      description: 'number, letters, character specials'
    },
    {
      name: '',
      label: 'Repeat Password',
      type: 'password',
      id: 'fs-register-repeat-password',
      description: 'Password is equal'
    }
  ],
  login: [
    {
      name: 'fs_username',
      label: 'Username',
      type: 'text',
      id: 'login-username'
    },
    {
      name: 'fs_password',
      label: 'Password',
      type: 'password',
      id: 'login-password'
    }
  ],
  data: [
    {
      name: 'fs_username',
      label: 'Username',
      type: 'text',
      id: 'update-username',
      class: 'col-md-6',
      value: null
    },
    {
      name: 'fs_fullname',
      label: 'Fullname',
      type: 'text',
      id: 'update-register',
      class: 'col-md-6',
      value: null
    },
    {
      name: 'fs_email',
      label: 'Email',
      type: 'email',
      id: 'update-email',
      class: 'col-md-6',
      value: null
    },
    {
      name: 'fs_age',
      label: 'Age',
      type: 'number',
      id: 'update-age',
      class: 'col-md-6',
      value: null
    }
  ],
  password: [
    {
      name: 'password_saved',
      label: 'Password',
      type: 'password',
      id: 'update-password',
      class: 'col-md-12',
      value: ''
    },
    {
      name: 'fs_password',
      label: 'New Password',
      type: 'password',
      id: 'update-new-password',
      class: 'col-md-6',
      value: ''
    },
    {
      name: '',
      label: 'Repeat Password',
      type: 'password',
      id: 'update-repeat-password',
      class: 'col-md-6',
      value: ''
    }
  ]
};
