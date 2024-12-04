"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/app.ts
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const apiKey = '3b1f7bf823d53fd03160341d195612f9';
const app = (0, express_1.default)();
// Set the view engine to EJS
app.set('view engine', 'ejs');
// Serve static files
app.use(express_1.default.urlencoded({ extended: true }));
// Route to render the main page with default values
app.get('/', (req, res) => {
    res.render('index', { weather: null, error: null });
});
// Route to fetch weather data
app.post('/get-weather', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const city = req.body.city;
    try {
        const response = yield axios_1.default.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const weather = response.data;
        res.render('index', { weather, error: null });
    }
    catch (error) {
        console.error(error);
        res.render('index', { weather: null, error: 'Error fetching weather data' });
    }
}));
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
