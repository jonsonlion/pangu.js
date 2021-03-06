import { assert } from 'chai';
import { Pangu } from '../../dist/shared/core';

describe('Pangu', function () {
  const pangu = new Pangu();

  describe('#spacing()', function () {
    it('處理 ~ 符號', function () {
      assert.equal(pangu.spacing('前面~後面'), '前面~ 後面');
      assert.equal(pangu.spacing('前面 ~ 後面'), '前面 ~ 後面');
      assert.equal(pangu.spacing('前面~ 後面'), '前面~ 後面');
    });

    it('處理 ` 符號', function () {
      assert.equal(pangu.spacing('前面`後面'), '前面 ` 後面');
    });

    it('處理 ! 符號', function () {
      assert.equal(pangu.spacing('前面!後面'), '前面! 後面');
      assert.equal(pangu.spacing('前面 ! 後面'), '前面 ! 後面');
      assert.equal(pangu.spacing('前面!後面'), '前面! 後面');
    });

    it('處理 @ 符號', function () {
      // https://twitter.com/vinta
      // http://weibo.com/vintalines
      assert.equal(pangu.spacing('請@vinta吃大便'), '請 @vinta 吃大便');
      assert.equal(pangu.spacing('請@陳上進 吃大便'), '請 @陳上進 吃大便');
    });

    it('處理 # 符號', function () {
      assert.equal(pangu.spacing('前面#H2G2後面'), '前面 #H2G2 後面');
      assert.equal(pangu.spacing('前面#銀河便車指南 後面'), '前面 #銀河便車指南 後面');
      assert.equal(pangu.spacing('前面#銀河便車指南 後面'), '前面 #銀河便車指南 後面');
      assert.equal(pangu.spacing('前面#銀河公車指南 #銀河拖吊車指南 後面'), '前面 #銀河公車指南 #銀河拖吊車指南 後面');
      assert.equal(pangu.spacing('前面#H2G2#後面'), '前面 #H2G2# 後面');
      assert.equal(pangu.spacing('前面#銀河閃電霹靂車指南#後面'), '前面 #銀河閃電霹靂車指南# 後面');
    });

    it('處理 $ 符號', function () {
      assert.equal(pangu.spacing('前面$後面'), '前面 $ 後面');
      assert.equal(pangu.spacing('前面$100後面'), '前面 $100 後面');
    });

    it('處理 % 符號', function () {
      assert.equal(pangu.spacing('前面%後面'), '前面 % 後面');
      assert.equal(pangu.spacing('前面100%後面'), '前面 100% 後面');
    });

    it('處理 ^ 符號', function () {
      assert.equal(pangu.spacing('前面^後面'), '前面 ^ 後面');
    });

    it('處理 & 符號', function () {
      assert.equal(pangu.spacing('前面&後面'), '前面 & 後面');
      assert.equal(pangu.spacing('Vinta&Mollie'), 'Vinta&Mollie');
      assert.equal(pangu.spacing('Vinta&陳上進'), 'Vinta & 陳上進');
      assert.equal(pangu.spacing('陳上進&Vinta'), '陳上進 & Vinta');
      assert.equal(pangu.spacing('得到一個A&B的結果'), '得到一個 A&B 的結果');
    });

    it('處理 * 符號', function () {
      assert.equal(pangu.spacing('前面*後面'), '前面 * 後面');
      assert.equal(pangu.spacing('Vinta*Mollie'), 'Vinta*Mollie');
      assert.equal(pangu.spacing('Vinta*陳上進'), 'Vinta * 陳上進');
      assert.equal(pangu.spacing('陳上進*Vinta'), '陳上進 * Vinta');
      assert.equal(pangu.spacing('得到一個A*B的結果'), '得到一個 A*B 的結果');
    });

    it('處理 ( ) 符號', function () {
      assert.equal(pangu.spacing('前面(中文123漢字)後面'), '前面 (中文 123 漢字) 後面');
      assert.equal(pangu.spacing('前面(中文123)後面'), '前面 (中文 123) 後面');
      assert.equal(pangu.spacing('前面(123漢字)後面'), '前面 (123 漢字) 後面');
      assert.equal(pangu.spacing('前面(中文123) tail'), '前面 (中文 123) tail');
      assert.equal(pangu.spacing('head (中文123漢字)後面'), 'head (中文 123 漢字) 後面');
      assert.equal(pangu.spacing('head (中文123漢字) tail'), 'head (中文 123 漢字) tail');
    });

    it('處理 - 符號', function () {
      assert.equal(pangu.spacing('前面-後面'), '前面 - 後面');
      assert.equal(pangu.spacing('Vinta-Mollie'), 'Vinta-Mollie');
      assert.equal(pangu.spacing('Vinta-陳上進'), 'Vinta - 陳上進');
      assert.equal(pangu.spacing('陳上進-Vinta'), '陳上進 - Vinta');
      assert.equal(pangu.spacing('得到一個A-B的結果'), '得到一個 A-B 的結果');
    });

    it('略過 _ 符號', function () {
      assert.equal(pangu.spacing('前面_後面'), '前面_後面');
    });

    it('處理 + 符號', function () {
      assert.equal(pangu.spacing('前面+後面'), '前面 + 後面');
      assert.equal(pangu.spacing('Vinta+Mollie'), 'Vinta+Mollie');
      assert.equal(pangu.spacing('Vinta+陳上進'), 'Vinta + 陳上進');
      assert.equal(pangu.spacing('陳上進+Vinta'), '陳上進 + Vinta');
      assert.equal(pangu.spacing('得到一個A+B的結果'), '得到一個 A+B 的結果');
      // assert.equal(pangu.spacing('得到一個C+的結果'), '得到一個 C+ 的結果');
      assert.equal(pangu.spacing('得到一個C++的結果'), '得到一個 C++ 的結果');
    });

    it('處理 = 符號', function () {
      assert.equal(pangu.spacing('前面=後面'), '前面 = 後面');
      assert.equal(pangu.spacing('Vinta=Mollie'), 'Vinta=Mollie');
      assert.equal(pangu.spacing('Vinta=陳上進'), 'Vinta = 陳上進');
      assert.equal(pangu.spacing('陳上進=Vinta'), '陳上進 = Vinta');
      assert.equal(pangu.spacing('得到一個A=B的結果'), '得到一個 A=B 的結果');
    });

    it('處理 { } 符號', function () {
      assert.equal(pangu.spacing('前面{中文123漢字}後面'), '前面 {中文 123 漢字} 後面');
      assert.equal(pangu.spacing('前面{中文123}後面'), '前面 {中文 123} 後面');
      assert.equal(pangu.spacing('前面{123漢字}後面'), '前面 {123 漢字} 後面');
      assert.equal(pangu.spacing('前面{中文123} tail'), '前面 {中文 123} tail');
      assert.equal(pangu.spacing('head {中文123漢字}後面'), 'head {中文 123 漢字} 後面');
      assert.equal(pangu.spacing('head {中文123漢字} tail'), 'head {中文 123 漢字} tail');
    });

    it('處理 [ ] 符號', function () {
      assert.equal(pangu.spacing('前面[中文123漢字]後面'), '前面 [中文 123 漢字] 後面');
      assert.equal(pangu.spacing('前面[中文123]後面'), '前面 [中文 123] 後面');
      assert.equal(pangu.spacing('前面[123漢字]後面'), '前面 [123 漢字] 後面');
      assert.equal(pangu.spacing('前面[中文123] tail'), '前面 [中文 123] tail');
      assert.equal(pangu.spacing('head [中文123漢字]後面'), 'head [中文 123 漢字] 後面');
      assert.equal(pangu.spacing('head [中文123漢字] tail'), 'head [中文 123 漢字] tail');
    });

    it('處理 | 符號', function () {
      assert.equal(pangu.spacing('前面|後面'), '前面 | 後面');
      assert.equal(pangu.spacing('Vinta|Mollie'), 'Vinta|Mollie');
      assert.equal(pangu.spacing('Vinta|陳上進'), 'Vinta | 陳上進');
      assert.equal(pangu.spacing('陳上進|Vinta'), '陳上進 | Vinta');
      assert.equal(pangu.spacing('得到一個A|B的結果'), '得到一個 A|B 的結果');
    });

    it('處理 \\ 符號', function () {
      assert.equal(pangu.spacing('前面\\後面'), '前面 \\ 後面');
    });

    it('處理 : 符號', function () {
      assert.equal(pangu.spacing('前面:後面'), '前面: 後面');
      assert.equal(pangu.spacing('前面 : 後面'), '前面 : 後面');
      assert.equal(pangu.spacing('前面: 後面'), '前面: 後面');
    });

    it('處理 ; 符號', function () {
      assert.equal(pangu.spacing('前面;後面'), '前面; 後面');
      assert.equal(pangu.spacing('前面 ; 後面'), '前面 ; 後面');
      assert.equal(pangu.spacing('前面; 後面'), '前面; 後面');
    });

    it('處理 " " 符號', function () {
      assert.equal(pangu.spacing('前面"中文123漢字"後面'), '前面 "中文 123 漢字" 後面');
      assert.equal(pangu.spacing('前面"中文123"後面'), '前面 "中文 123" 後面');
      assert.equal(pangu.spacing('前面"123漢字"後面'), '前面 "123 漢字" 後面');
      assert.equal(pangu.spacing('前面"中文123" tail'), '前面 "中文 123" tail');
      assert.equal(pangu.spacing('head "中文123漢字"後面'), 'head "中文 123 漢字" 後面');
      assert.equal(pangu.spacing('head "中文123漢字" tail'), 'head "中文 123 漢字" tail');
    });

    it("處理 ' ' 符號", function () {
      // TODO
      assert.equal(pangu.spacing("陳上進 likes 林依諾's status."), "陳上進 likes 林依諾's status.");
    });

    it('處理 < > 符號', function () {
      assert.equal(pangu.spacing('前面<中文123漢字>後面'), '前面 <中文 123 漢字> 後面');
      assert.equal(pangu.spacing('前面<中文123>後面'), '前面 <中文 123> 後面');
      assert.equal(pangu.spacing('前面<123漢字>後面'), '前面 <123 漢字> 後面');
      assert.equal(pangu.spacing('前面<中文123> tail'), '前面 <中文 123> tail');
      assert.equal(pangu.spacing('head <中文123漢字>後面'), 'head <中文 123 漢字> 後面');
      assert.equal(pangu.spacing('head <中文123漢字> tail'), 'head <中文 123 漢字> tail');
    });

    it('處理 < 符號', function () {
      assert.equal(pangu.spacing('前面<後面'), '前面 < 後面');
      assert.equal(pangu.spacing('Vinta<Mollie'), 'Vinta<Mollie');
      assert.equal(pangu.spacing('Vinta<陳上進'), 'Vinta < 陳上進');
      assert.equal(pangu.spacing('陳上進<Vinta'), '陳上進 < Vinta');
      assert.equal(pangu.spacing('得到一個A<B的結果'), '得到一個 A<B 的結果');
    });

    it('處理 , 符號', function () {
      assert.equal(pangu.spacing('前面,後面'), '前面, 後面');
      assert.equal(pangu.spacing('前面 , 後面'), '前面 , 後面');
      assert.equal(pangu.spacing('前面, 後面'), '前面, 後面');
    });

    it('處理 > 符號', function () {
      assert.equal(pangu.spacing('前面>後面'), '前面 > 後面');
      assert.equal(pangu.spacing('Vinta>Mollie'), 'Vinta>Mollie');
      assert.equal(pangu.spacing('Vinta>陳上進'), 'Vinta > 陳上進');
      assert.equal(pangu.spacing('陳上進>Vinta'), '陳上進 > Vinta');
      assert.equal(pangu.spacing('得到一個A>B的結果'), '得到一個 A>B 的結果');
    });

    it('處理 . 符號', function () {
      assert.equal(pangu.spacing('前面.後面'), '前面. 後面');
      assert.equal(pangu.spacing('前面 . 後面'), '前面 . 後面');
      assert.equal(pangu.spacing('前面. 後面'), '前面. 後面');
    });

    it('處理 ? 符號', function () {
      assert.equal(pangu.spacing('前面?後面'), '前面? 後面');
      assert.equal(pangu.spacing('前面 ? 後面'), '前面 ? 後面');
      assert.equal(pangu.spacing('前面? 後面'), '前面? 後面');
    });

    it('處理 / 符號', function () {
      assert.equal(pangu.spacing('前面/後面'), '前面 / 後面');
      assert.equal(pangu.spacing('Vinta/Mollie'), 'Vinta/Mollie');
      assert.equal(pangu.spacing('Vinta/陳上進'), 'Vinta / 陳上進');
      assert.equal(pangu.spacing('陳上進/Vinta'), '陳上進 / Vinta');
      assert.equal(pangu.spacing('得到一個A/B的結果'), '得到一個 A/B 的結果');
    });

    it('處理特殊字元', function () {
      // \u2022
      assert.equal(pangu.spacing('前面•後面'), '前面 • 後面');

      // \u2026
      assert.equal(pangu.spacing('前面…後面'), '前面… 後面');

      // \u2027
      assert.equal(pangu.spacing('前面‧後面'), '前面 ‧ 後面');
    });
  });

  describe('#spacingText()', function () {
    it('callback', function (done) {
      pangu.spacingText('中文123漢字abc', function (err, newText) {
        assert.equal(newText, '中文 123 漢字 abc');
        done();
      });
    });

    it('promise', function (done) {
      pangu.spacingText('中文123漢字abc', function (err, newText) {
        assert.equal(newText, '中文 123 漢字 abc');
        done();
      });
    });
  });
});
