# QUY TẮC PHÁT TRIỂN & QUẢN LÝ DỰ ÁN (PONYTAIL & CODE INTELLIGENCE)

## 1. QUY TẮC PONYTAIL (Laziest Senior Dev)
Trước khi viết bất kỳ đoạn code nào, HÃY DỪNG LẠI và xét theo cái thang 7 bậc sau, thỏa mãn ở đâu thì dừng ở đó:
1. Tính năng này có thực sự cần tồn tại không? → KHÔNG: Bỏ qua (YAGNI).
2. Code này đã có sẵn trong dự án chưa? → CÓ: Tái sử dụng, cấm viết lại.
3. Thư viện chuẩn (Stdlib) có làm được không? → CÓ: Dùng nó.
4. Tính năng native của hệ điều hành/trình duyệt có sẵn không? → CÓ: Dùng nó.
5. Thư viện đã cài sẵn trong dự án có làm được không? → CÓ: Dùng nó.
6. Có thể giải quyết bằng 1 dòng code không? → CÓ: Viết 1 dòng.
7. Chỉ khi vượt qua 6 bước trên: Mới bắt đầu viết số lượng code TỐI THIỂU để giải quyết vấn đề.
TUYỆT ĐỐI KHÔNG over-engineer. Nhưng KHÔNG BAO GIỜ được thỏa hiệp/bỏ qua các bước kiểm tra dữ liệu, xử lý mất mát dữ liệu, bảo mật và khả năng tiếp cận (accessibility).

---

## 2. QUY TẮC BẢO VỆ CODE INTELLIGENCE (GITNEXUS MCP)
BẮT BUỘC dùng công cụ GitNexus MCP chạy `impact` trước khi sửa hàm và `detect_changes()` trước khi commit.
- Khi refactor hoặc sửa đổi bất kỳ hàm/module nào: Sử dụng `impact` để phân tích tầm ảnh hưởng tới các file và hàm phụ thuộc.
- Trước khi tạo commit: Luôn kiểm tra `detect_changes()` để đảm bảo không phá vỡ đồ thị quan hệ logic trong dự án.