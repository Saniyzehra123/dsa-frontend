import React from 'react'

const ForgetPassword = () => {
  return (
    <div>
         <div className="container mt-36">
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4"><h1>Forgot Password</h1></div><hr />
          <div className="col-md-4"></div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4 p-6">
            <form method='post' className='p-4 bg-slate-50'>
              
              <div class="form-floating mb-3">
                <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" />
                  <label for="floatingInput">Email address</label>
              </div>
             
               <button type="button" className="btn btn-outline-success">Get Otp</button> <br /><br />
               <p>Go to  <a href="/login">Sign In</a> Page</p>
           
           
             
            </form>
          </div>
          <div className="col-md-4"></div>
          <hr />
        </div>
      </div>

   <style jsx>{`

        a{
        text-decoration:none;
        }
         body{
        background:#FDF5E6;
        }


       `}</style>
      </div>
  )
}

export default ForgetPassword