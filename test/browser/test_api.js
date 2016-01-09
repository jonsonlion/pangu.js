/* global pangu, __html__ */

import 'babel-polyfill';
import { assert } from 'chai';

describe('BrowserPangu', function () {
  // 避免某些情況 HTML 會被轉譯造成不一致，一律都塞進一個 div 裡
  function realHTML(filePath) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = __html__[filePath];

    return tempDiv.innerHTML;
  }

  describe('spacingText()', function () {
    it('處理 text', function () {
      pangu.spacingText('新八的構造成分有95%是眼鏡、3%是水、2%是垃圾', function (error, newText) {
        assert.equal(newText, '新八的構造成分有 95% 是眼鏡、3% 是水、2% 是垃圾');
      });
    });
  });

  describe('spacingPageTitle()', function () {
    it('處理 <title>', function () {
      document.title = "Mr.龍島主道：「Let's Party!各位高明博雅君子！」";
      pangu.spacingPageTitle();
      assert.equal(document.title, "Mr. 龍島主道：「Let's Party! 各位高明博雅君子！」");
    });
  });

  describe('spacingPageBody()', function () {
    it('處理 <body>', function () {
      document.body.innerHTML = __html__['test/_fixture/body.html'];
      pangu.spacingPageBody();
      assert.equal(document.body.innerHTML, realHTML('test/_fixture/body_expected.html'));
    });
  });

  describe('spacingElementById()', function () {
    it('處理 #idName', function () {
      document.body.innerHTML = __html__['test/_fixture/id_name.html'];
      pangu.spacingElementById('e1');
      assert.equal(document.body.innerHTML, realHTML('test/_fixture/id_name_expected.html'));
    });
  });

  describe('spacingElementByClassName()', function () {
    it('處理 #className 之一', function () {
      document.body.innerHTML = __html__['test/_fixture/class_name_1.html'];
      pangu.spacingElementByClassName('e2');
      assert.equal(document.body.innerHTML, realHTML('test/_fixture/class_name_1_expected.html'));
    });

    it('處理 #className 之二', function () {
      document.body.innerHTML = __html__['test/_fixture/class_name_2.html'];
      pangu.spacingElementByClassName('e4');
      assert.equal(document.body.innerHTML, realHTML('test/_fixture/class_name_2_expected.html'));
    });

    it('處理 #className 之三', function () {
      document.body.innerHTML = __html__['test/_fixture/class_name_3.html'];
      pangu.spacingElementByClassName('e5');
      assert.equal(document.body.innerHTML, realHTML('test/_fixture/class_name_3_expected.html'));
    });
  });

  describe('spacingElementByTagName()', function () {
    it('處理 <tag>', function () {
      document.body.innerHTML = __html__['test/_fixture/tag_name.html'];
      pangu.spacingElementByTagName('article');
      assert.equal(document.body.innerHTML, realHTML('test/_fixture/tag_name_expected.html'));
    });
  });
});