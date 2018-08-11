import puppeteer from "puppeteer";
import path from "path";
import $ from 'jquery';
const html = require('fs').readFileSync('index.html').toString();

import '../src/prototype';

global.$ = $;
import API from '../lib/fakeServer';
import src from '../src/script.js';
window.initialize = src.initialize;


let page;
let browser;
const width = 400;
const height = 1080;
const APP = `file://${path.dirname(__dirname)}/index.html`;

jest.dontMock('fs').dontMock('jquery');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe('extending prototype: Number.prototype.padLeft', () => {
  test('one digit must be preceded by a zero', () => {
    expect((5).padLeft()).toBe('05');
    expect((12).padLeft()).toBe('12');
  });
});

describe('extending prototype: Date.prototype.format', () => {
  test('should be implemented using padLeft', () => {
    Number.prototype.padLeft = jest.fn(Number.prototype.padLeft);
    var spy = jest.spyOn(Number.prototype, 'padLeft');
    var now = new Date();
    now.format();
    expect(spy).toHaveBeenCalled();
  });

  test('should return following pattern: yyyy-MM-dd hh:mm:ss', () => {
    var now = new Date();
    var expected = now.getFullYear() + '-';
    var regex = new RegExp(expected + '\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}', 'g');
    expect(regex.test(now.format())).toBeTruthy();
  });
});

describe('implementing DOM manipulate functions', () => {
  beforeEach(() => {
    document.documentElement.innerHTML = html;
  });

  test('should exist elements', () => {
    expect($('#posts').length).toBe(1);
    expect($('#username').length).toBe(1);
    expect($('#message').length).toBe(1);
    expect($('#post').length).toBe(1);
    expect($('#new-post-form').length).toBe(1);
  });

  test('should no have post item after calling the clearList', () => {
    src.clearList();
    expect($('#posts > li').length).toBe(0);
  })

  test('should return post item with makePostElement', () => {
    src.clearList();
    var post = { user: 'ingikim', message: 'test message', created_at: '2019-12-30 10:32:30' };
    src.makePostElement(post).appendTo('#posts');
    const elLi = $('#posts > li');
    expect(elLi.length).toBe(1);
    expect(elLi.text()).toEqual(expect.stringContaining('test message'));
    expect(elLi.text()).toEqual(expect.stringContaining('2019-12-30 10:32:30'));
  });

  test('should have render preset posts after calling renderPosts', async done => {
    src.clearList();
    src.renderPosts();
    await sleep(500);
    expect($('#posts > li').length).toBe(3);
    done();
  });
});


beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: false,
    slowMo: 5,
    args: [`--window-size=${width},${height}`]
  });
  page = await browser.newPage();
  await page.setViewport({ width, height });
});
afterAll(() => {
  browser.close();
});

describe("end-to-end tests", async () => {
  test("should be able to submit post with form", async () => {
    await page.goto(APP);
    await page.waitForSelector("form#new-post-form");
    await page.click("#username");
    await page.type("#username", 'testuser');
    await page.click("#message");
    await page.type("#message", 'testmessage');
    await page.click("button#post");
    await sleep(1000);
  });

  test("should post successfully with username and message", async () => {
    const len = await page.evaluate(() => document.querySelectorAll('#posts > li').length);
    expect(len).toBe(4);
  });

  test("should display success message", async () => {
    const className = await page.evaluate(() => document.querySelector('.alert.alert-success').className);
    expect(className).toEqual(expect.not.stringContaining('hide'));
  });

  test("should not post without username", async () => {
    await page.click("#username");
    await page.$eval('#username', input => input.value = '');
    await page.click("#message");
    await page.type("#message", 'testmessage');
    await page.click("button#post");
    await sleep(1000);

    const len = await page.evaluate(() => document.querySelectorAll('#posts > li').length);
    expect(len).toBe(4);
  });

  test("should not post without message", async () => {
    await page.click("#username");
    await page.type("#username", 'testuser');
    await page.click("#message");
    await page.$eval('#message', input => input.value = '');
    await page.click("button#post");
    await sleep(1000);

    const len = await page.evaluate(() => document.querySelectorAll('#posts > li').length);
    expect(len).toBe(4);
  });
});

/* 아래 테스트는 통과하지 않아도 좋습니다 */
describe("filtering post by username", async () => {

  xtest("should filter post when click username", async () => {
    await page.click(".ingikim a");
    const statusJohnny = await page.evaluate(() => document.querySelector('#posts > li.johnnykoo').style.display);
    expect(statusJohnny).toBe('none');
    const statusIngi = await page.evaluate(() => document.querySelector('#posts > li.ingikim').style.display);
    expect(statusIngi).toBe('');
  });

  xtest("should display 'show all' button when posts filtered", async () => {
    await sleep(500);
    const statusShowAll = await page.evaluate(() => document.querySelector('#show-all').style.display);
    expect(statusShowAll).toBe('');
  });
});
