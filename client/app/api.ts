import axios from "axios";

const api = axios.create({
	baseURL: "http://serverfolio-production.up.railway.app:8080/api",
	headers: {
		"Content-Type": "application/json",
	},
});

export default api;
