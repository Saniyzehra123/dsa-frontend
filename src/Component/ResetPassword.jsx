import React from 'react'

const ResetPassword = () => {
    return (
        <div>
            <div className="container op">
                <div className="row">
                    <div className="col-md-12">
                        <section className="text-gray-600 body-font mt-28">
                            <div class="container px-5 pt-24 mx-auto">
                                <div class="flex flex-col text-center w-full">
                                    <h1 class="sm:text-3xl text-2xl font-medium title-font text-gray-900">Reset Password</h1><hr />
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4 p-6">
                        <form method='post' className='p-4 bg-slate-50'>

                            <div class="form-floating mb-3">
                                <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" />
                                <label for="floatingInput">New Password</label>
                            </div>
                            <div class="form-floating mb-3">
                                <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" />
                                <label for="floatingInput">Confirm New Password</label>
                            </div>

                            <button type="button" className="btn btn-outline-success">Reset Your Password</button> <br /><br />




                        </form>
                    </div>
                    <div className="col-md-4"></div>
                    <hr />
                </div>
            </div>
            <style jsx>
                {`
            
             @media (max-width: 1300px){
                 .op{
                margin-top:50px; 
                 }

                        }
        `}
            </style>
        </div>
    )
}

export default ResetPassword