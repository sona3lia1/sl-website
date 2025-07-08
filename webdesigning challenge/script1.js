$(document).ready(function(){
    $("#sign-form").validate({
        rules:{
        fname:{
            required:true,
            minlength:4,
            maxlength:15
        },
        sname:{
            required:true,
            minlength:4,
            maxlength:15
        },
        emailAddress:
        {
            required:true,
            email:true
        },
        password:{
            required:true,
            minlength:6
        },
        day:{
            required:true
        },
        month:{
            required:true
        },
        year:{
            required:true
        },
        gender:{
            required:true
        },
    },
     messages:{
        fname:{
            required:"Enter first name",
            minlength:"atleast 4 characters"
        }
                
            }
        


        
    })
})