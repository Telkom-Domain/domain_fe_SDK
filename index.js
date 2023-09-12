function formEncodeLowerCaseKey (payload) {
  var obj = Object.entries(payload)
  .map(([key, value]) => {
      return `${encodeURIComponent(key.toLowerCase())}=${encodeURIComponent(value)}`
  })
  .join("&");
  console.log("OBJ ", obj);
  return obj;
}

exports.iam = {
//   IAM_SERVER: 'https://api-oss.domain-dev.site',
  IAM_SERVER: '',
  CLIENT_ID: '',
  CLIENT_SECRET: '',
  REDIRECT_URI: '',
  AUDIENCE: '',
  SCOPE: '',
  setup: (args) => {
      this.CLIENT_ID = args.CLIENT_ID
      this.CLIENT_SECRET = args.CLIENT_SECRET
      this.REDIRECT_URI = args.REDIRECT_URI
      this.AUDIENCE = args.AUDIENCE
      this.SCOPE = args.SCOPE
      this.IAM_SERVER = args.IAM_SERVER
    //   this.IAM_SERVER = 'https://api-oss.domain-dev.site'
      console.log(args)
      console.log('clientid masuk:' + this.CLIENT_ID)
      console.log('redirect uri:' + this.REDIRECT_URI)
      console.log('iam server url:' + this.IAM_SERVER)
  },
  redirect: () => {
      let payload = {
          CLIENT_ID: this.CLIENT_ID,
          REDIRECT_URI: this.REDIRECT_URI,
          AUDIENCE: this.AUDIENCE,
          SCOPE: this.SCOPE
      }
      console.log('payload:')
      console.log(payload)
      console.log('iam server:' + this.IAM_SERVER)
      let redirect_url = this.IAM_SERVER + '/authorize?' + formEncodeLowerCaseKey(payload)
      console.log('redirect url =' + redirect_url)
    //   return redirect_url
    window.location.href(redirect_url);
  },
  getAccessToken: async (authCode = '') => {
      let payload = {
          code: authCode,
          grant_type: "authorization_code",
          CLIENT_ID: this.CLIENT_ID,
          CLIENT_SECRET: this.CLIENT_SECRET,
          REDIRECT_URI: this.REDIRECT_URI,
      }
      console.log('payload:')
      console.log(payload)
      console.log(this.IAM_SERVER)
      let accessURL = `${this.IAM_SERVER}/oauth/token`
      console.log(accessURL)
      const response = await fetch(accessURL, {
          method: 'POST',
          body: formEncodeLowerCaseKey(payload),
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
          }
      })
      console.log(response)
      const data = response.json()
      console.log(data)
      return data
  },
  logoutURL: () => {
      let logout_url = `${this.IAM_SERVER}/signout?client_id=${encodeURIComponent(this.CLIENT_ID)}`
      console.log('logout url = ' + logout_url)
      window.location.href(logout_url);
    //   return logout_url
  },
  testingConsole: () => {
    console.log("THIS IS DOMAIN SDK");
  }

}