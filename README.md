# Tinh Bàn Hoàng Đạo

Website quiz cung hoàng đạo và tử vi, gồm 4 mục:

- **Quiz kiến thức** (mục chính): hơn 400 câu chia 10 mảng: nền tảng, ngày sinh, biểu tượng, tính cách, nguyên tố, hành tinh chủ quản, lịch sử, thần thoại, thiên văn, 12 nhà & góc chiếu. Mỗi lượt hỏi toàn bộ câu của mảng đã chọn.

- **Quiz tính cách**: 8 câu hỏi, cho ra cung hoàng đạo hợp với tính cách nhất.
- **Tử vi hằng ngày**: nhập ngày sinh để xem cung, tử vi hôm nay/ngày mai, tuổi âm lịch, mệnh nạp âm, tam hợp, tứ hành xung.
- **Xem hợp đôi**: chấm điểm hợp nhau theo nguyên tố hoàng đạo và con giáp.

Nội dung tử vi mang tính giải trí. Trang nằm trong `index.html`, ngân hàng câu hỏi nằm trong `questions.js`.

## Thêm câu hỏi

Mở `questions.js`, thêm một dòng vào mảng của mảng kiến thức tương ứng trong `HAND`:

```js
['Câu hỏi?', 'Đáp án đúng', ['Sai 1', 'Sai 2', 'Sai 3'], 'Giải thích'],
```

Câu hỏi tra cứu (ngày sinh, chủ tinh, nguyên tố, ký hiệu…) được sinh tự động từ bảng `Z`.
