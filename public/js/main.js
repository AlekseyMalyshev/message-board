'use strict';

$(document).ready(init);

var author;
var $editbox;
var currentId;

function init() {
  $('form.login').on('submit', formSubmit);

  $('div.board').on('click', 'i.fa-plus-square-o', addMessage);
  $('div.board').on('keydown', 'input.editbox', keySave);
  $('body').on('keydown', keyCancel);
  $('div.board').on('click', 'i.fa-pencil-square-o', editMessage);
  $('div.board').on('click', 'i.fa-trash-o', confirmDelete);

  author = localStorage.author;
  if (author) {
    $('form.login>input').css('display', 'none');
    $('form.login>input').removeAttr('required');
    $('form.login>button').text('Logout');
    loadBoard();
  }
}

function loginOK(login) {
  author = login._id;
  localStorage.author = author;
  $('form.login>input').css('display', 'none');
  $('form.login>input').removeAttr('required');
  $('form.login>button').text('Logout');
  loadBoard();
}

function loadBoard() {
  $.ajax({
    method: 'GET',
    url: '/board',
    success: showBoard,
    error: showError
  });
}

function showBoard(html) {
  $('div.board').children().remove();
  $('div.board').append($.parseHTML(html));
}

function formSubmit() {
  if (author) {
    logout();
  }
  else {
    login();
  }
  return false;
}

function logout() {
  $('form.login>input').css('display', 'inline-block');
  $('form.login>input').attr('required');
  $('form.login>button').text('Login');
  author = undefined;
  localStorage.removeItem('author');
  $('div.board').children().remove();
}

function login() {
  var login = {};
  login.user = $('form.login>input#user').val();
  login.pass = $('form.login>input#pass').val();

  $.ajax({
    method: 'POST',
    url: '/login',
    data: login,
    success: loginOK,
    error: showError
  });
}

function showError(err) {
  if (err.status === 401) {
    $('div#show-error h4.error').text('Incorrect password. Try again or choose another name.');
  }
  else {
    $('div#show-error h4.error').text('An error has occured. The operation cannot be completed at this time.');
  }
  $('div#show-error').modal();
}

function addMessage(event) {
  event.stopPropagation();

  currentId = undefined;
  //newMessage();
  showEditBox($(event.target).parent().children('div'));
}

function newMessage() {
  var $mh = $('<div class="message">');
  var $div = $('<div>');
  $mh.append($div);
  $div.append($('<div class="time">'));
  $div.append($('<div class="author">'));
  var $text = $('<div class="text">');
  //$text.text('&nbsp;');
  $div.append($text);
  $mh.append($('<i class="fa fa-plus-square-o">'));
  $mh.prependTo($('div.messages'));
  showEditBox($text);
}

function showEditBox($text) {
  if ($editbox) {
    $editbox.remove();
    $editbox = undefined;
  }

  $editbox = $('<input class="editbox">');
  $editbox.val($text.text());
  $editbox.width($text.width());
  $editbox.height($text.height());

  var paddingTop = parseFloat($text.css('padding-top'));
  var paddingLeft = parseFloat($text.css('padding-left'));

  var pos = $text.position();
  $editbox.css('top', pos.top + paddingTop);
  $editbox.css('left', pos.left + paddingLeft);

  $text.append($editbox);
  $editbox.focus();
}

function keyCancel(event) {
  if ($editbox && event.keyCode === 27) {
    $editbox.remove();
    $editbox = undefined;
  }
}

function keySave(event) {
  if (event.keyCode === 13) {
    var $text = $editbox.parent();
    if ($editbox.val() !== $text.text()) {
      $text.text($editbox.val());
      saveMessage($editbox.val());
    }
    $editbox.remove();
    $editbox = undefined;
  }
}

function saveMessage(text) {
  var message = {};
  message.author = author;
  message.text = text;
  message._id = currentId;

  if (currentId) {
    $.ajax({
      method: 'PUT',
      url: '/api/message',
      data: message,
      success: loadBoard,
      error: showError
    });
  }
  else {
    $.ajax({
      method: 'POST',
      url: '/api/message',
      data: message,
      success: loadBoard,
      error: showError
    });
  }
}

function editMessage(event) {
  event.stopPropagation();

  currentId = $(event.target).parents('div.message').attr('id');
  showEditBox($(event.target).parent().find('div.text'));
}

function confirmDelete(event) {
  event.stopPropagation();

  currentId = $(event.target).parents('div.message').attr('id');

  $('h4.modal-title').text('Are you sure you want to delete this message? This operation can not be undone.');
  $('button.cancel').off();
  $('button.confirm').off();
  $('button.confirm').on('click', deleteMessage);
  $('div#confirm').modal();
}

function deleteMessage(event) {
  $.ajax({
    method: 'DELETE',
    url: '/api/message/' + currentId,
    success: loadBoard,
    error: showError
  });
}
