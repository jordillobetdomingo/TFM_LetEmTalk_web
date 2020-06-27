<template>
    <div id="AddUserForm">
        <transition name="form-add-elem">
            <div>
                <form>
                    <div class="form-group" v-if="this.listErrors.length > 0">
                        <b>Please correct the following error(s):</b>
                        <ul>
                            <li v-for="error in this.listErrors" :key="error">{{ error }}</li>
                        </ul>
                    </div>
                    <div class="form-group">
                        <label for="firstName">First Name</label>
                        <input type="text" name="firstName" v-model="firstName" class="form-control" required/>
                    </div>
                    <div class="form-group">
                        <label for="lastName">Last Name</label>
                        <input type="text" name="lastName" v-model="lastName" class="form-control" required/>
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" name="email" v-model="email" class="form-control" required/>
                    </div>
                    <div class="form-group">
                        <label for="username">Username</label>
                        <input type="text" name="username" v-model="username" class="form-control" required/>
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" name="password" v-model="password" class="form-control" maxlength="32" required/>
                    </div>
                    <div class="form-group">
                        <label for="password2">Repeat password</label>
                        <input type="password" name="password2" v-model="password2" class="form-control" maxlength="32" required/>
                    </div>
                    <div class="btn-group-sm btn-group-form">
                        <button class="btn btn-secondary" @click="addUser($event)">Save</button>
                        <button class="btn btn-secondary" @click="reset($event)">Cancel</button>
                    </div>
                </form>
            </div>
        </transition>
    </div>
</template>

<script>
import EventBus from '@/utils/event-bus'

export default {
    name: "addUserForm",
    data() {
        return {
            showUserForm: false,
            firstName: '',
            lastName:'',
            email: '',
            username: '',
            password: '',
            password2: '',
            rulesPassword: [
                { message:'One letter required.', regex:/[A-Za-z]+/ },
                { message:"One number required.", regex:/[0-9]+/ },
				{ message:"8 characters minimum.", regex:/.{8,}/ },
            ],
            listErrors: []
        }
    },
    methods: {
        addUser(event) {
            event.preventDefault();
            this.checkPassword();
            if (this.listErrors.length === 0) {
                this.axios.post("/user/", {"firstName": this.firstName, "lastName": this.lastName, "email": this.email, "username": this.username, "password": this.password })
                .then(response => {
                    EventBus.$emit('add-user', response.data);    
                });
                this.reset(event);
            }
        },
        reset(event) {
            this.firstName = '';
            this.lastName = '';
            this.email = '';
            this.username = '';
            this.password = '';
            this.password2 = '';
            event.preventDefault();
            EventBus.$emit('hidde-form-user');
        },
        checkPassword() {
            this.listErrors = [];
            if (this.firstName == '') {
                this.listErrors.push("First name not be empty");
            }
            if (this.firstName == '') {
                this.listErrors.push("Last name not be empty");
            }
            if (!this.validEmail(this.email)) {
                this.listErrors.push("Email format is not correct");
            }
            if (this.firstName == '') {
                this.listErrors.push("Username not be empty");
            }
			for (let condition of this.rulesPassword) {
				if (!condition.regex.test(this.password)) {
					this.listErrors.push(condition.message);
				}
            }
            if (this.password !== this.password2) {
                this.listErrors.push('Passwords don\'t match');
            }
            return (this.listErrors.length == 0);
        }, 
        validEmail: function (email) {
            var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }
    }
}
</script>