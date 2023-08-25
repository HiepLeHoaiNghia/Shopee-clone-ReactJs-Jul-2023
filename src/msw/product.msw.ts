import { rest } from 'msw'
import { HttpStatusCode } from 'axios'
import config from 'src/constants/config'

const productsRes = {
  message: 'Lấy các sản phẩm thành công',
  data: {
    products: [
      {
        _id: '60ad02422fb52902585972a9',
        images: [
          'https://api-ecom.duthanhduoc.com/images/08b79b1d-169d-4de1-85a2-4e5e8ff535b7.jpg',
          'https://api-ecom.duthanhduoc.com/images/182d6e25-65fa-4abe-b822-70d87550bf4e.jpg',
          'https://api-ecom.duthanhduoc.com/images/827e675d-e553-497e-9b15-d2df5fc7192d.jpg',
          'https://api-ecom.duthanhduoc.com/images/b6425e3f-3cc3-4696-94f7-5053afca2c71.jpg',
          'https://api-ecom.duthanhduoc.com/images/4d80b312-e605-4508-ab80-14dd75f6d23d.jpg',
          'https://api-ecom.duthanhduoc.com/images/9e628716-0b94-44d8-850c-e96adc4b1c8f.jpg',
          'https://api-ecom.duthanhduoc.com/images/20a1a8e5-1b49-4854-a221-0f96130b5fd8.jpg'
        ],
        price: 279000,
        rating: 5,
        price_before_discount: 315000,
        quantity: 1959,
        sold: 36,
        view: 396,
        name: '[Mã FAMALLT5 giảm 15% đơn 150K] Áo thun tay lỡ GENZ phông Unisex nam nữ Cotton oversize form rộng Racing Genz GZT021',
        category: {
          _id: '60aba4e24efcc70f8892e1c6',
          name: 'Áo thun',
          __v: 0
        },
        image: 'https://api-ecom.duthanhduoc.com/images/08b79b1d-169d-4de1-85a2-4e5e8ff535b7.jpg',
        createdAt: '2021-05-25T13:57:22.760Z',
        updatedAt: '2023-08-18T15:40:59.233Z'
      },
      {
        _id: '60ad01102fb52902585972a7',
        images: [
          'https://api-ecom.duthanhduoc.com/images/05f090b8-736e-4100-b4f4-7a09f48e718a.jpg',
          'https://api-ecom.duthanhduoc.com/images/594a2d08-04f4-4902-873f-e9ba865bc497.jpg',
          'https://api-ecom.duthanhduoc.com/images/0f906616-bc7f-4661-9bbe-5570b5d902b7.jpg',
          'https://api-ecom.duthanhduoc.com/images/e129d0b1-8a45-463a-a668-d619461ae984.jpg',
          'https://api-ecom.duthanhduoc.com/images/780a9d1a-74e9-4d8c-bbae-ed3d5eca8b97.jpg',
          'https://api-ecom.duthanhduoc.com/images/986f2f5b-23cc-498f-9adb-9d07e6923eb3.jpg',
          'https://api-ecom.duthanhduoc.com/images/e383805f-e875-4398-800d-ae07f2d2e8ce.jpg',
          'https://api-ecom.duthanhduoc.com/images/c3df0eba-05f8-4ba8-9ef4-f67a28fa4b81.jpg',
          'https://api-ecom.duthanhduoc.com/images/7cefd5f0-6ded-443d-821b-4909592e6490.jpg'
        ],
        price: 53000,
        rating: 5,
        price_before_discount: 106000,
        quantity: 16746,
        sold: 2255,
        view: 875,
        name: 'Áo thun nam nữ tay lỡ YINXX, áo phông nam nữ form rộng A304',
        category: {
          _id: '60aba4e24efcc70f8892e1c6',
          name: 'Áo thun',
          __v: 0
        },
        image: 'https://api-ecom.duthanhduoc.com/images/b1c008a6-bb10-46a6-8caf-2b0e9ca4e175.jpg',
        createdAt: '2021-05-25T13:52:16.271Z',
        updatedAt: '2023-08-23T17:12:35.246Z'
      },
      {
        _id: '60ad004c2fb52902585972a6',
        images: [
          'https://api-ecom.duthanhduoc.com/images/b1c008a6-bb10-46a6-8caf-2b0e9ca4e175.jpg',
          'https://api-ecom.duthanhduoc.com/images/2df345c5-4381-4863-9510-17f44572ad45.jpg',
          'https://api-ecom.duthanhduoc.com/images/00b21c79-e1a0-45f0-9152-6881e644b15b.jpg',
          'https://api-ecom.duthanhduoc.com/images/dc35e2ed-0407-4f27-9b97-bad9bc785deb.jpg',
          'https://api-ecom.duthanhduoc.com/images/f1de05b8-60c5-4940-be9f-b6cc98d34061.jpg',
          'https://api-ecom.duthanhduoc.com/images/4788c7fd-d728-4f47-8000-e858d6466384.jpg',
          'https://api-ecom.duthanhduoc.com/images/b4614934-0164-4845-bf14-d19de6c36835.jpg',
          'https://api-ecom.duthanhduoc.com/images/1ec5e192-c2fc-4411-b170-4aa2b1635ddb.jpg',
          'https://api-ecom.duthanhduoc.com/images/a751a941-7d74-4f2a-a238-c806b055ed11.jpg'
        ],
        price: 49000,
        rating: 5,
        price_before_discount: 70000,
        quantity: 6797,
        sold: 21,
        view: 679,
        name: 'Mẫu Mới Khuyến Mãi Sốc 3 Ngày ⚡ Áo Thun Tay Lỡ In Bướm Dirty Coins Ao Thun Unisex From Rộng -BONSEN STORE',
        category: {
          _id: '60aba4e24efcc70f8892e1c6',
          name: 'Áo thun',
          __v: 0
        },
        image: 'https://api-ecom.duthanhduoc.com/images/b1c008a6-bb10-46a6-8caf-2b0e9ca4e175.jpg',
        createdAt: '2021-05-25T13:49:00.060Z',
        updatedAt: '2023-08-23T17:12:38.814Z'
      },
      {
        _id: '60acfac72fb529025859729f',
        images: [
          'https://api-ecom.duthanhduoc.com/images/ad82b185-5c18-41ca-90ec-1c54c846fd49.jpg',
          'https://api-ecom.duthanhduoc.com/images/04001c71-9d8f-4e68-b9ac-cbb47406f30f.jpg',
          'https://api-ecom.duthanhduoc.com/images/3142a89e-8301-42c3-9621-1c901e4a097b.jpg',
          'https://api-ecom.duthanhduoc.com/images/849be86c-8880-44dd-a037-ffc447d336f3.jpg',
          'https://api-ecom.duthanhduoc.com/images/0856c2f1-fcc7-470d-9e99-d7b9f6f32dcc.jpg'
        ],
        price: 39000,
        rating: 5,
        price_before_discount: 60000,
        quantity: 17453,
        sold: 97,
        view: 277,
        name: '[Có video] Áo phông form rộng tay lỡ unisex - Áo thun orange soda - Sỉ áo thun số lượng lớn',
        category: {
          _id: '60aba4e24efcc70f8892e1c6',
          name: 'Áo thun',
          __v: 0
        },
        image: 'https://api-ecom.duthanhduoc.com/images/ad82b185-5c18-41ca-90ec-1c54c846fd49.jpg',
        createdAt: '2021-05-25T13:25:27.965Z',
        updatedAt: '2023-08-23T13:20:04.337Z'
      },
      {
        _id: '60acf0ec2fb5290258597299',
        images: [
          'https://api-ecom.duthanhduoc.com/images/25c409a5-9e6c-4e2d-a49e-23a8c291f749.jpg',
          'https://api-ecom.duthanhduoc.com/images/85e6928d-9e7f-4ff9-8105-8389448f6a48.jpg',
          'https://api-ecom.duthanhduoc.com/images/1705c99d-e61b-4eb3-a786-7d90e927b242.jpg',
          'https://api-ecom.duthanhduoc.com/images/6f9f953c-6048-419f-87c3-24c24620dfab.jpg',
          'https://api-ecom.duthanhduoc.com/images/49eaf710-c340-43fc-b321-43bf896d7a39.jpg',
          'https://api-ecom.duthanhduoc.com/images/400b5529-01d4-42d7-be63-e179f8c0a4df.jpg',
          'https://api-ecom.duthanhduoc.com/images/f0b9ff49-824f-4a7a-8bce-a4d6599e26a6.jpg',
          'https://api-ecom.duthanhduoc.com/images/03c61a2a-f703-486b-961d-73b38be7240f.jpg',
          'https://api-ecom.duthanhduoc.com/images/59bcd4bd-fd27-416c-b7df-dd831a3da621.jpg'
        ],
        price: 119000,
        rating: 5,
        price_before_discount: 198000,
        quantity: 234,
        sold: 24,
        view: 592,
        name: 'Áo thun nam ngắn tay thể thao chất liệu thun lạnh 4 chiều AT39',
        category: {
          _id: '60aba4e24efcc70f8892e1c6',
          name: 'Áo thun',
          __v: 0
        },
        image: 'https://api-ecom.duthanhduoc.com/images/25c409a5-9e6c-4e2d-a49e-23a8c291f749.jpg',
        createdAt: '2021-05-25T12:43:24.537Z',
        updatedAt: '2023-08-23T19:35:50.215Z'
      },
      {
        _id: '60abaa9adbfa6e153cb9962c',
        images: [
          'https://api-ecom.duthanhduoc.com/images/c9e6cdf9-5d7c-4767-ab19-5d64b133fd3b.jpg',
          'https://api-ecom.duthanhduoc.com/images/d938561d-9ad1-4f61-822a-9d29b3cb663e.jpg',
          'https://api-ecom.duthanhduoc.com/images/7c2e9bd9-0773-4f17-9568-62ab8ce3a689.jpg',
          'https://api-ecom.duthanhduoc.com/images/a70f8655-53c8-4359-96c2-ac733f11279e.jpg',
          'https://api-ecom.duthanhduoc.com/images/dd139f2c-14cf-43f8-ab58-2b4cadcd2140.jpg'
        ],
        price: 69000,
        rating: 5,
        price_before_discount: 80000,
        quantity: 8129,
        sold: 4100,
        view: 380,
        name: '[Mã FAMAYMA2 giảm 10K đơn 50K] Áo thun nam nữ form rộng Yinxx, áo phông tay lỡ ATL43',
        category: {
          _id: '60aba4e24efcc70f8892e1c6',
          name: 'Áo thun',
          __v: 0
        },
        image: 'https://api-ecom.duthanhduoc.com/images/c9e6cdf9-5d7c-4767-ab19-5d64b133fd3b.jpg',
        createdAt: '2021-05-24T13:31:06.769Z',
        updatedAt: '2023-08-18T15:32:26.398Z'
      },
      {
        _id: '60aba9a2dbfa6e153cb9962b',
        images: [
          'https://api-ecom.duthanhduoc.com/images/2b5e1bfa-b202-46b3-b68b-f6c8a19cb1cf.jpg',
          'https://api-ecom.duthanhduoc.com/images/71ff840e-80bd-4d01-b997-f409392c3901.jpg',
          'https://api-ecom.duthanhduoc.com/images/9fb54b27-bb8d-415c-bb41-72a113f33fb5.jpg',
          'https://api-ecom.duthanhduoc.com/images/2741ba1d-844f-4b6d-baa8-8ebe41a4d5af.jpg',
          'https://api-ecom.duthanhduoc.com/images/63a231e8-aa62-4b0a-a7c7-9d327181ae0a.jpg',
          'https://api-ecom.duthanhduoc.com/images/050e6792-e9bb-4093-b198-3864eddffa3f.jpg',
          'https://api-ecom.duthanhduoc.com/images/92a099c0-b9b7-4d37-b234-ee319868bfe4.jpg',
          'https://api-ecom.duthanhduoc.com/images/23d8c0fb-8d30-4438-a973-3908a89db968.jpg',
          'https://api-ecom.duthanhduoc.com/images/4553c8a6-dfb8-4323-97b9-bf17cac384a4.jpg'
        ],
        price: 69000,
        rating: 5,
        price_before_discount: 100000,
        quantity: 23565,
        sold: 3800,
        view: 916,
        name: '[Mã FAMAYMA2 giảm 10K đơn 50K] Áo thun tay lỡ unisex Yinxx, áo phông form rộng ATL187',
        category: {
          _id: '60aba4e24efcc70f8892e1c6',
          name: 'Áo thun',
          __v: 0
        },
        image: 'https://api-ecom.duthanhduoc.com/images/2b5e1bfa-b202-46b3-b68b-f6c8a19cb1cf.jpg',
        createdAt: '2021-05-24T13:26:58.072Z',
        updatedAt: '2023-08-23T02:22:29.550Z'
      }
    ],
    pagination: {
      page: 1,
      limit: 30,
      page_size: 1
    }
  }
}

const productDetailRes = {
  message: 'Lấy sản phẩm thành công',
  data: {
    _id: '60afb2c76ef5b902180aacba',
    images: [
      'https://api-ecom.duthanhduoc.com/images/bbea6d3e-e5b1-494f-ab16-02eece816d50.jpg',
      'https://api-ecom.duthanhduoc.com/images/6c4f6bde-6242-40fd-be52-d06033636e04.jpg',
      'https://api-ecom.duthanhduoc.com/images/1385ed69-6843-4edb-a1fb-e5fc795a99e5.jpg',
      'https://api-ecom.duthanhduoc.com/images/7f4f7a5b-b003-462a-a6b9-c0e69175def3.jpg',
      'https://api-ecom.duthanhduoc.com/images/1c323bdd-c0ef-4538-b09d-34c1a4478baa.jpg',
      'https://api-ecom.duthanhduoc.com/images/5054f46f-d317-40f6-a804-6b22dc92e946.jpg',
      'https://api-ecom.duthanhduoc.com/images/eed30991-df2d-41b5-afb2-697a06ba3299.jpg',
      'https://api-ecom.duthanhduoc.com/images/2922fee1-448c-4302-bcc2-804e0fe44f84.jpg',
      'https://api-ecom.duthanhduoc.com/images/84f7bf91-685c-4be9-bd8c-1f0a4e2e21c3.jpg'
    ],
    price: 3190000,
    rating: 4.6,
    price_before_discount: 3990000,
    quantity: 138,
    sold: 1200,
    view: 63780,
    name: 'Điện Thoại Vsmart Active 3 6GB/64GB - Hàng Chính Hãng',
    description:
      '<p>Điện Thoại Vsmart Active 3 6GB/64GB - H&agrave;ng Ch&iacute;nh H&atilde;ng<br />Bộ sản phẩm bao gồm: Th&acirc;n m&aacute;y, sạc, c&aacute;p USB, tai nghe, ốp lưng, dụng cụ lấy sim, s&aacute;ch hướng dẫn sử dụng.</p><p>Chất sang chảnh, chuẩn m&agrave;n h&igrave;nh<br />M&agrave;n h&igrave;nh sống động 6.39 AMOLED tr&agrave;n viền<br />Camera Selfie trượt 16MP ấn tượng, đầy m&ecirc; hoặc<br />Bộ 3 Camera AI 48MP si&ecirc;u chụp b&oacute;ng đ&ecirc;m<br />Thiết kế mặt lưng tr&agrave;n &aacute;nh s&aacute;ng<br />Nổi bật trong đ&ecirc;m sắc m&agrave;u. Lấy cảm hứng từ sắc đ&ecirc;m huyền ảo, được chế t&aacute;c tinh xảo tạo n&ecirc;n mặt lưng 3D chuyển m&agrave;u khi tương t&aacute;c với &aacute;nh s&aacute;ng. Với 4 m&agrave;u sắc Xanh Sapphire, Xanh Lục Bảo, T&iacute;m Ngọc v&agrave; Đen Thạch Anh, sẽ khiến bạn trở bạn trở th&agrave;nh t&acirc;m điểm của sự ch&uacute; &yacute;<br />Thật ấn tượng với camera selfie sẽ tự động bật l&ecirc;n v&agrave; thu lại theo thao t&aacute;c chụp ảnh selfie c&ugrave;ng thuật to&aacute;n l&agrave;m đẹp AI Beauty, ảnh selfie cực k&igrave; th&uacute; vị<br />K&iacute;ch thước 66.25 x 75.62 x 8.83 (mm)<br />Trọng lượng 183 g<br />Camera trước 16MP f/2.2 Popup <br />Camera sau 48MP f/1.7 - Camera chụp đ&ecirc;m<br /> 8MP f/2.2 - Camera g&oacute;c rộng<br /> 2MP f/2.4 - Camera x&oacute;a ph&ocirc;ng <br />Độ ph&acirc;n giải FHD+ ( 1080 x 2340 )<br />Cổng USB USB Type-C<br />Điện Thoại Vsmart Active 3 6GB/64GB - H&agrave;ng Ch&iacute;nh H&atilde;ng</p><p>Cảm ơn qu&yacute; kh&aacute;ch đ&atilde; quan t&acirc;m đến sản phẩm b&ecirc;n shop, qu&yacute; kh&aacute;ch vui l&ograve;ng d&agrave;nh &iacute;t thời gian đọc kĩ ch&iacute;nh s&aacute;ch bảo h&agrave;nh đổi trả:<br />- Sản phẩm được bao test 7 ng&agrave;y kể từ ng&agrave;y nhận được sản phẩm v&agrave; sẽ được đổi m&aacute;y mới c&ugrave;ng model hoặc gi&aacute; trị tương đương sau khi được thẩm định lỗi kĩ thuật.<br />- Sản phẩm lỗi kĩ thuật được x&aacute;c nhận bởi trung t&acirc;m bảo h&agrave;nh ủy quyền ch&iacute;nh h&atilde;ng (bằng văn bản); kh&aacute;ch h&agrave;ng c&oacute; thể gửi lại shop để x&aacute;c nhận lỗi hoặc tới trạm bảo h&agrave;nh gần nhất để thẩm định lỗi.<br />- Sản phẩm đổi trả phải c&ograve;n nguy&ecirc;n hiện trạng m&aacute;y kh&ocirc;ng trầy xước, kh&ocirc;ng bể vỡ, v&ocirc; nước, g&atilde;y ch&acirc;n sim, khung thẻ nhớ&hellip; (tất cả c&aacute;c t&aacute;c động ngoại lực từ ph&iacute;a kh&aacute;ch h&agrave;ng đều TỪ CHỐI BẢO H&Agrave;NH)<br />- Sản phẩm đổi trả phải c&ograve;n nguy&ecirc;n hộp tr&ugrave;ng imei, phụ kiện k&egrave;m theo m&aacute;y kh&ocirc;ng trầy xước, ch&aacute;y nổ, đứt d&acirc;y (nếu trầy xước shop kh&ocirc;ng đổi phụ kiện mới)<br />- Sau 7 ng&agrave;y bao test, sản phẩm vẫn nhận ch&iacute;nh s&aacute;ch bảo h&agrave;nh 18 th&aacute;ng kể từ ng&agrave;y k&iacute;ch hoạt bảo h&agrave;nh (kh&aacute;ch chịu ph&iacute; vận chuyển tới shop bảo h&agrave;nh hộ hoặc tự đến trung t&acirc;m bảo h&agrave;nh gần nhất để được hỗ trợ)<br />- Trong một số trường hợp sản phẩm đ&atilde; được k&iacute;ch hoạt bảo h&agrave;nh điện tử để tham gia chương tr&igrave;nh khuyến m&atilde;i c&oacute; gi&aacute; tốt cho kh&aacute;ch h&agrave;ng. Vui l&ograve;ng chat với nh&acirc;n vi&ecirc;n tư vấn để được hỗ trợ th&ecirc;m th&ocirc;ng tin.<br />- Sản phẩm bị TỪ CHỐI BẢO H&Agrave;NH khi ch&aacute;y nổ, bể vỡ, t&aacute;c động ngoại lực v&agrave;o th&acirc;n v&agrave; b&ecirc;n trong m&aacute;y, c&oacute; thay đổi sửa chữa b&ecirc;n ngo&agrave;i.<br />- C&aacute;c sản phẩm bị kh&oacute;a t&agrave;i khoản như Gmail, Samsung account&hellip; Kh&aacute;ch tự chịu ph&iacute; mở kh&oacute;a nếu kh&ocirc;ng nhớ mật khẩu.<br />Điện Thoại Vsmart Active 3 6GB/64GB - H&agrave;ng Ch&iacute;nh H&atilde;ng<br />#điện_thoại #dienthoai #di_động #didong #điện_thoại_di_động #dien_thoai_di_dong #điện_thoại_ch&iacute;nh_h&atilde;ng #h&agrave;ng_ch&iacute;nh_h&atilde;ng #điện_thoại_gi&aacute;_rẻ #dien_thoai_gia_re #gi&aacute; rẻ #khuyen_mai #freeship #mobile #smartphone #điện_thoại_vsmart #vsmart #vsmart_ active_3</p>',
    category: {
      _id: '60afafe76ef5b902180aacb5',
      name: 'Điện thoại',
      __v: 0
    },
    image: 'https://api-ecom.duthanhduoc.com/images/bbea6d3e-e5b1-494f-ab16-02eece816d50.jpg',
    createdAt: '2021-05-27T14:55:03.113Z',
    updatedAt: '2023-08-25T03:24:05.686Z'
  }
}
const productsRequest = rest.get(`${config.baseUrl}products`, (req, res, ctx) => {
  return res(ctx.status(HttpStatusCode.Ok), ctx.json(productsRes))
})

const productDetailRequest = rest.get(`${config.baseUrl}products/:id`, (req, res, ctx) => {
  return res(ctx.status(HttpStatusCode.Ok), ctx.json(productDetailRes))
})

const productRequests = [productsRequest, productDetailRequest]

export default productRequests
