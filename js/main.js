import { SendMail } from "./components/mailer.js";

(() => {
    const { createApp } = Vue

    createApp({
        //created() {
           //fetch('./includes/send.php')
            //.then(res => res.json())
           // .then(data => this.sendData = data)
           //.catch(error => console.error(error)); 

       //},

        //data() {
            //return {
                //sendData: {},
                //LbData: {},
                //showLB: false
           // }
       // },
        

        data() {
            return {
                message: 'Hello Vue!'
            }
        },

        methods: {
            processMailFailure(result) {
                
                //let message = '{"result":true}';

                let message = JSON.parse(result.message);
                console.log(result);
                //return value;

               

                //console.log(message.count);
                console.log(message.result);
                // show a failure message in the UI
                // use this.$refs to connect to the elements on the page and mark any empty fields/inputs with an error class
                //alert('failure! and if you keep using an alert, DOUBLE failure!');        
                // show some errors in the UI here to let the user know the mail attempt was successful
                result.forEach(field => {
                    this.$refs[field].classList.add('error');
                    this.$refs[field].placeholder = 'Broken!';
                });

                let errorPopper = document.querySelector('.alart-container');

                errorPopper.textContent = 'Please fill out the form';

                errorPopper.classList.add('showme');

                setTimeout(function() {
                    errorPopper.classList.remove('showme');
            }, 2000);



            processMailSuccess(result) 

                result.forEach(field => {
                    this.$refs[field].classList.add('sucess');
                    this.$refs[field].placeholder = 'Good Luck!!';
                });

                let errorPopper = document.querySelector('.alart-container');

                errorPopper.textContent = 'message has sent!';

                errorPopper.classList.add('showme');

                setTimeout(function() {
                    errorPopper.classList.remove('showme');
            }, 2000);
                // show a success message in the UI
                //alert("success! but don't EVER use alerts. They are gross.");        
                // show some UI here to let the user know the mail attempt was successful
            },

            processMail(event) {        
                // use the SendMail component to process mail
                SendMail(this.$el.parentNode)
                    .then(data => this.processMailSuccess(data))
                    .catch(err => this.processMailFailure(err));
            }
        }
    }).mount('#mail-form')
})();