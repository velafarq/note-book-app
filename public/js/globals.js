const IS_LOGGED_IN = !!localStorage.getItem('token');
const $body = $('.body');

const $logout = $('#logout');
const $login = $("#login");
const $register = $("#register");
const $newEntry = $(".nav__list__add-entry");
const $categories = $("#nav-categories");
const $categoryDropDown = $("#categories-dropdown");

const $home = $(".home");

const $practice = $("#practice-sessions");
const $lessons = $("#lessons");
const $performances = $("#performances");
const $masterClass = $("#master-classes");
const $other = $("#other");


const $addPostForm = $('#addPost');
const $loginForm = $("#login-user");
const $registerForm = $('#register-new-user');

const $mainBlock = $(".main__block");

const $formCategories = $("#categories");
const $title = $("#title");
const $textArea = $("#body");



const BASE_URL = 'http://localhost:8080';
