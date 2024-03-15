/* eslint-disable prettier/prettier */
import config from "@/config";

export default {
    data: () => ({
        response: null,
        error: "",
        endpoint: config.url,
        method: "GET",
        body: {},
        header: { "Content-Type": "application/json" },
    }),
    methods: {
        async req() {
            try {
                let options = {
                    method: this.method,
                    headers: this.header
                };

                if (this.method !== "GET") {
                    options.body = JSON.stringify(this.body);
                }

                const response = await fetch(this.endpoint, options);

                if (!response.ok) {
                    this.error = response.status;
                    return false;
                }

                const data = await response.json();
                this.response = data;

                return true;
            } catch (error) {
                console.log(error);
                this.error = error.message;
                return false;
            }
        },
        setEndpoint(endpoint) {
            this.endpoint = config.url + endpoint;
        },
        async registerUser(data) {
            this.body = data;
            this.method = "POST";
            this.setEndpoint("user/create");

            return this.req();
        },
        async loginUser(data) {
            this.body = data;
            this.method = "POST";
            this.setEndpoint("user/login");

            return this.req();
        },
        async createTask(data) {
            let jwt = localStorage.getItem("token") || "";
            this.body = data;
            this.header.authorization = jwt;
            this.method = "POST";
            this.setEndpoint("task/create");

            return this.req();
        },
        async destroyTask(id) {
            let jwt = localStorage.getItem("token") || "";
            this.header.authorization = jwt;
            this.method = "DELETE";
            this.setEndpoint(`task/destroy/${id}`);

            return this.req();
        },
        async updateTask(id, state) {
            let jwt = localStorage.getItem("token") || "";
            this.header.authorization = jwt;
            this.body = { state };
            this.method = "PUT";
            this.setEndpoint(`task/update/${id}`);

            return this.req();
        }
    }
}