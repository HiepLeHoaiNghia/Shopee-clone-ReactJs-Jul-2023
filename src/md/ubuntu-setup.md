### Cài đặt dự án trong môi trường Ubuntu

1. cài Ubuntu app trên Windows store
2. cài wsl bằng cli:

```
    wsl --install
```

3. tạo user trong ubuntu app:

```
    sudo adduser <username>
```

4. di chuyển thư mục dự án vào trong ubuntu app.
5. mở ubuntu CLI và cấp quyền cho user từ root account:

```
    sudo usermod -aG docker <username>
    sudo usermod -aG sudo <username>
```

6. Đăng nhập vào user vừa đc cấp quyền:

```
    su - <username>
```

7. Cho phép user được quyền chỉnh sửa thư mục dự án:

```
    sudo chown -R $USER:$USER \*
```

8. Cho phép user được quyền chỉnh sửa file với bất kỳ đuôi nào:

```
    sudo chown -R $USER:$USER .\*
```

9. Config git bash truy cập đc vào ubuntu app:

```
    git config --global --add safe.directory ///wsl.localhost/Ubuntu-22.04/home/<username>/car-shere-app
```

///wsl.localhost/Ubuntu-22.04/home/<username>/car-shere-app là đường dẫn đến thư mục dự án trong ubuntu app.
