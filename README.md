# Projek Microservices Web Magang SMK
# API Test Scenarios (Postman/Manual)

---

## 1. AUTHENTICATION

### 1.1 Register Admin
**POST** `/auth/register/admin`
- Deskripsi: Register akun admin baru
- Request JSON:
```json
{
  "email": "admin1@example.com",
  "password": "password123",
  "role": "admin",
  "full_name": "Admin Satu",
  "phone_number": "081234567890",
  "photo": "https://example.com/photo.jpg"
}
```
- Ekspektasi Response (Success):
```json
{
  "status": "success",
  "message": "Admin berhasil didaftarkan",
  "data": {
    "accessToken": "...",
    "refreshToken": "...",
    "user": {
      "id": "user-...",
      "email": "admin1@example.com",
      "role": "admin",
      "full_name": "Admin Satu"
    }
  }
}
```
- Ekspektasi Response (Error):
```json
{
  "status": "fail",
  "message": "Email sudah terdaftar"
}
```
- Catatan: Tidak butuh token

### 1.2 Register Student
**POST** `/auth/register/student`
- Deskripsi: Register akun student baru
- Request JSON:
```json
{
  "email": "student1@example.com",
  "password": "password123",
  "role": "student",
  "nis": "2024001",
  "full_name": "Student Satu",
  "gender": "male",
  "birth_date": "2005-01-15",
  "phone_number": "081234567891",
  "address": "Jl. Contoh No. 123",
  "class": "XII IPA 1",
  "major": "IPA",
  "school_name": "SMK Negeri 1",
  "photo": "https://example.com/photo.jpg",
  "bio": "Siswa yang rajin dan tekun"
}
```
- Ekspektasi Response (Success):
```json
{
  "status": "success",
  "message": "Student berhasil didaftarkan",
  "data": { ... }
}
```
- Ekspektasi Response (Error):
```json
{
  "status": "fail",
  "message": "NIS sudah terdaftar"
}
```
- Catatan: Tidak butuh token

### 1.3 Register Mentor
**POST** `/auth/register/mentor`
- Deskripsi: Register akun mentor baru
- Request JSON:
```json
{
  "email": "mentor1@example.com",
  "password": "password123",
  "role": "mentor",
  "full_name": "Mentor Satu",
  "position": "Senior Developer",
  "gender": "female",
  "phone_number": "081234567892",
  "department": "IT Development"
}
```
- Ekspektasi Response (Success):
```json
{
  "status": "success",
  "message": "Mentor berhasil didaftarkan",
  "data": { ... }
}
```
- Ekspektasi Response (Error):
```json
{
  "status": "fail",
  "message": "Email sudah terdaftar"
}
```
- Catatan: Tidak butuh token

### 1.4 Login
**POST** `/auth/login`
- Deskripsi: Login user
- Request JSON:
```json
{
  "email": "admin1@example.com",
  "password": "password123"
}
```
- Ekspektasi Response (Success):
```json
{
  "status": "success",
  "message": "Login berhasil",
  "data": {
    "accessToken": "...",
    "refreshToken": "...",
    "user": { ... }
  }
}
```
- Ekspektasi Response (Error):
```json
{
  "status": "fail",
  "message": "Email atau password salah"
}
```
- Catatan: Tidak butuh token

### 1.5 Refresh Token
**POST** `/auth/refresh`
- Deskripsi: Refresh access token
- Request JSON:
```json
{
  "refresh_token": "..."
}
```
- Ekspektasi Response (Success):
```json
{
  "status": "success",
  "message": "Token berhasil diperbarui",
  "data": { ... }
}
```
- Ekspektasi Response (Error):
```json
{
  "status": "fail",
  "message": "Refresh token tidak valid"
}
```
- Catatan: Tidak butuh token

### 1.6 Logout
**POST** `/auth/logout`
- Deskripsi: Logout user (client-side)
- Ekspektasi Response (Success):
```json
{
  "status": "success",
  "message": "Logout berhasil"
}
```
- Catatan: Tidak butuh token

### 1.7 Check Email Availability
**GET** `/auth/check-email?email=...`
- Deskripsi: Cek ketersediaan email
- Ekspektasi Response (Success):
```json
{
  "status": "success",
  "data": {
    "email": "student1@example.com",
    "available": true,
    "message": "Email tersedia"
  }
}
```
- Catatan: Tidak butuh token

### 1.8 Check NIS Availability
**GET** `/auth/check-nis?nis=...`
- Deskripsi: Cek ketersediaan NIS
- Ekspektasi Response (Success):
```json
{
  "status": "success",
  "data": {
    "nis": "2024001",
    "available": true,
    "message": "NIS tersedia"
  }
}
```
- Catatan: Tidak butuh token

---

## 2. USER PROFILE

### 2.1 Get Profile
**GET** `/users/profile`
- Deskripsi: Mendapatkan profile user yang sedang login
- Ekspektasi Response (Success, role admin):
```json
{
  "status": "success",
  "data": {
    "id": "user-...",
    "email": "admin1@example.com",
    "role": "admin",
    "full_name": "Admin Satu",
    "phone_number": "081234567890",
    "photo": "https://example.com/photo.jpg",
    "created_at": "...",
    "updated_at": "..."
  }
}
```
- Ekspektasi Response (Success, role student/mentor):
```json
{
  "status": "success",
  "data": { ... }
}
```
- Catatan: Butuh token (semua role)

### 2.2 Update Profile
**PUT** `/users/profile`
- Deskripsi: Update profile user yang sedang login
- Request JSON (admin):
```json
{
  "full_name": "Admin Satu Updated",
  "phone_number": "081234567899",
  "photo": "https://example.com/new-photo.jpg"
}
```
- Ekspektasi Response (Success):
```json
{
  "status": "success",
  "message": "Profile berhasil diupdate",
  "data": { ... }
}
```
- Ekspektasi Response (Error):
```json
{
  "status": "fail",
  "message": "Data tidak valid"
}
```
- Catatan: Butuh token (semua role)

### 2.3 Change Password
**PUT** `/users/password`
- Deskripsi: Ganti password user
- Request JSON:
```json
{
  "current_password": "password123",
  "new_password": "newpassword123",
  "confirm_password": "newpassword123"
}
```
- Ekspektasi Response (Success):
```json
{
  "status": "success",
  "message": "Password berhasil diubah"
}
```
- Ekspektasi Response (Error):
```json
{
  "status": "fail",
  "message": "Password saat ini salah"
}
```
- Catatan: Butuh token

---

## 3. ADMIN MANAGEMENT (Admin Only)

### 3.1 Create Admin
**POST** `/api/admins`
- Deskripsi: Membuat admin baru
- Request JSON:
```json
{
  "email": "admin2@example.com",
  "password": "password123",
  "role": "admin",
  "full_name": "Admin Dua",
  "phone_number": "081234567891",
  "photo": "https://example.com/photo2.jpg"
}
```
- Ekspektasi Response (Success):
```json
{
  "status": "success",
  "message": "Admin berhasil dibuat",
  "data": { ... }
}
```
- Ekspektasi Response (Error):
```json
{
  "status": "fail",
  "message": "Email sudah terdaftar"
}
```
- Catatan: Butuh token admin

### 3.2 Get All Admins
**GET** `/api/admins?page=1&limit=10&search=&sort_by=created_at&sort_order=desc`
- Deskripsi: Mendapatkan daftar admin
- Ekspektasi Response (Success):
```json
{
  "status": "success",
  "message": "Daftar admin berhasil diambil",
  "data": [ ... ],
  "pagination": { ... }
}
```
- Catatan: Butuh token admin

### 3.3 Get Admin by ID
**GET** `/api/admins/{id}`
- Deskripsi: Mendapatkan admin berdasarkan ID
- Ekspektasi Response (Success):
```json
{
  "status": "success",
  "message": "Admin berhasil ditemukan",
  "data": { ... }
}
```
- Ekspektasi Response (Error):
```json
{
  "status": "fail",
  "message": "Admin tidak ditemukan"
}
```
- Catatan: Butuh token admin

### 3.4 Update Admin
**PUT** `/api/admins/{id}`
- Deskripsi: Update data admin
- Request JSON:
```json
{
  "full_name": "Admin Dua Updated"
}
```
- Ekspektasi Response (Success):
```json
{
  "status": "success",
  "message": "Admin berhasil diupdate",
  "data": { ... }
}
```
- Catatan: Butuh token admin

### 3.5 Delete Admin
**DELETE** `/api/admins/{id}`
- Deskripsi: Hapus admin
- Ekspektasi Response (Success):
```json
{
  "status": "success",
  "message": "Admin berhasil dihapus"
}
```
- Catatan: Tidak bisa hapus diri sendiri, butuh token admin

---

## 4. MENTOR MANAGEMENT (Admin & Company)

### 4.1 Create Mentor
**POST** `/api/mentors`
- Deskripsi: Membuat mentor baru (admin: any mentor, company: only their mentors)
- Request JSON:
```json
{
  "email": "mentor2@example.com",
  "password": "password123",
  "role": "mentor",
  "full_name": "Mentor Dua",
  "position": "Lead Developer",
  "gender": "male",
  "phone_number": "081234567893",
  "department": "Software Engineering"
}
```
- Ekspektasi Response (Success):
```json
{
  "status": "success",
  "message": "Mentor berhasil dibuat",
  "data": {
    "id": "mentor-...",
    "email": "mentor2@example.com",
    "role": "mentor",
    "full_name": "Mentor Dua",
    "position": "Lead Developer",
    "gender": "male",
    "phone_number": "081234567893",
    "department": "Software Engineering",
    "id_company": "company-...",
    "created_at": "...",
    "updated_at": "..."
  }
}
```
- Ekspektasi Response (Error):
```json
{
  "status": "fail",
  "message": "Email sudah terdaftar"
}
```
- Catatan: Butuh token admin atau company

### 4.2 Get All Mentors
**GET** `/api/mentors?page=1&limit=10&search=&sort_by=created_at&sort_order=desc`
- Deskripsi: Mendapatkan daftar mentor (admin: all mentors, company: only their mentors)
- Ekspektasi Response (Success):
```json
{
  "status": "success",
  "message": "Daftar mentor berhasil diambil",
  "data": [
    {
      "id": "mentor-...",
      "email": "mentor2@example.com",
      "role": "mentor",
      "full_name": "Mentor Dua",
      "position": "Lead Developer",
      "gender": "male",
      "phone_number": "081234567893",
      "department": "Software Engineering",
      "id_company": "company-...",
      "created_at": "...",
      "updated_at": "..."
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 15,
    "totalPages": 2,
    "hasNext": true,
    "hasPrev": false
  }
}
```
- Catatan: Butuh token admin atau company

### 4.3 Get Mentor by ID
**GET** `/api/mentors/{id}`
- Deskripsi: Mendapatkan mentor berdasarkan ID (admin: any mentor, company: only their mentors)
- Ekspektasi Response (Success):
```json
{
  "status": "success",
  "message": "Mentor berhasil ditemukan",
  "data": {
    "id": "mentor-...",
    "email": "mentor2@example.com",
    "role": "mentor",
    "full_name": "Mentor Dua",
    "position": "Lead Developer",
    "gender": "male",
    "phone_number": "081234567893",
    "department": "Software Engineering",
    "id_company": "company-...",
    "created_at": "...",
    "updated_at": "..."
  }
}
```
- Ekspektasi Response (Error):
```json
{
  "status": "fail",
  "message": "Mentor tidak ditemukan"
}
```
- Catatan: Butuh token admin atau company

### 4.4 Update Mentor
**PUT** `/api/mentors/{id}`
- Deskripsi: Update data mentor (admin: any mentor, company: only their mentors)
- Request JSON:
```json
{
  "full_name": "Mentor Dua Updated",
  "position": "Senior Lead Developer",
  "department": "Advanced Software Engineering"
}
```
- Ekspektasi Response (Success):
```json
{
  "status": "success",
  "message": "Mentor berhasil diupdate",
  "data": {
    "id": "mentor-...",
    "email": "mentor2@example.com",
    "role": "mentor",
    "full_name": "Mentor Dua Updated",
    "position": "Senior Lead Developer",
    "gender": "male",
    "phone_number": "081234567893",
    "department": "Advanced Software Engineering",
    "id_company": "company-...",
    "created_at": "...",
    "updated_at": "..."
  }
}
```
- Ekspektasi Response (Error):
```json
{
  "status": "fail",
  "message": "Anda tidak memiliki akses ke mentor ini"
}
```
- Catatan: Butuh token admin atau company

### 4.5 Delete Mentor
**DELETE** `/api/mentors/{id}`
- Deskripsi: Hapus mentor (admin: any mentor, company: only their mentors)
- Ekspektasi Response (Success):
```json
{
  "status": "success",
  "message": "Mentor berhasil dihapus"
}
```
- Ekspektasi Response (Error):
```json
{
  "status": "fail",
  "message": "Anda tidak memiliki akses ke mentor ini"
}
```
- Catatan: Butuh token admin atau company

---

## 5. STUDENT MANAGEMENT (Admin Only)

### 5.1 Create Student
**POST** `/api/students`
- Deskripsi: Membuat student baru
- Request JSON:
```json
{
  "email": "student2@example.com",
  "password": "password123",
  "role": "student",
  "nis": "2024002",
  "full_name": "Student Dua",
  "gender": "female",
  "birth_date": "2005-02-15",
  "phone_number": "081234567894",
  "address": "Jl. Contoh No. 456",
  "class": "XII IPA 2",
  "major": "IPA",
  "school_name": "SMK Negeri 2",
  "photo": "https://example.com/photo2.jpg",
  "bio": "Siswa yang aktif dan kreatif"
}
```
- Ekspektasi Response (Success):
```json
{
  "status": "success",
  "message": "Student berhasil dibuat",
  "data": {
    "id": "student-...",
    "email": "student2@example.com",
    "role": "student",
    "nis": "2024002",
    "full_name": "Student Dua",
    "gender": "female",
    "birth_date": "2005-02-15",
    "phone_number": "081234567894",
    "address": "Jl. Contoh No. 456",
    "class": "XII IPA 2",
    "major": "IPA",
    "school_name": "SMK Negeri 2",
    "photo": "https://example.com/photo2.jpg",
    "bio": "Siswa yang aktif dan kreatif",
    "created_at": "...",
    "updated_at": "..."
  }
}
```
- Ekspektasi Response (Error):
```json
{
  "status": "fail",
  "message": "NIS sudah terdaftar"
}
```
- Catatan: Butuh token admin

### 5.2 Get All Students
**GET** `/api/students?page=1&limit=10&search=&sort_by=created_at&sort_order=desc`
- Deskripsi: Mendapatkan daftar student
- Ekspektasi Response (Success):
```json
{
  "status": "success",
  "message": "Daftar student berhasil diambil",
  "data": [
    {
      "id": "student-...",
      "email": "student2@example.com",
      "role": "student",
      "nis": "2024002",
      "full_name": "Student Dua",
      "gender": "female",
      "birth_date": "2005-02-15",
      "phone_number": "081234567894",
      "address": "Jl. Contoh No. 456",
      "class": "XII IPA 2",
      "major": "IPA",
      "school_name": "SMK Negeri 2",
      "photo": "https://example.com/photo2.jpg",
      "bio": "Siswa yang aktif dan kreatif",
      "created_at": "...",
      "updated_at": "..."
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3,
    "hasNext": true,
    "hasPrev": false
  }
}
```
- Catatan: Butuh token admin

### 5.3 Get Student by ID
**GET** `/api/students/{id}`
- Deskripsi: Mendapatkan student berdasarkan ID
- Ekspektasi Response (Success):
```json
{
  "status": "success",
  "message": "Student berhasil ditemukan",
  "data": {
    "id": "student-...",
    "email": "student2@example.com",
    "role": "student",
    "nis": "2024002",
    "full_name": "Student Dua",
    "gender": "female",
    "birth_date": "2005-02-15",
    "phone_number": "081234567894",
    "address": "Jl. Contoh No. 456",
    "class": "XII IPA 2",
    "major": "IPA",
    "school_name": "SMK Negeri 2",
    "photo": "https://example.com/photo2.jpg",
    "bio": "Siswa yang aktif dan kreatif",
    "created_at": "...",
    "updated_at": "..."
  }
}
```
- Ekspektasi Response (Error):
```json
{
  "status": "fail",
  "message": "Student tidak ditemukan"
}
```
- Catatan: Butuh token admin

### 5.4 Update Student
**PUT** `/api/students/{id}`
- Deskripsi: Update data student
- Request JSON:
```json
{
  "full_name": "Student Dua Updated",
  "class": "XII IPA 3",
  "bio": "Siswa yang aktif, kreatif, dan berprestasi"
}
```
- Ekspektasi Response (Success):
```json
{
  "status": "success",
  "message": "Student berhasil diupdate",
  "data": {
    "id": "student-...",
    "email": "student2@example.com",
    "role": "student",
    "nis": "2024002",
    "full_name": "Student Dua Updated",
    "gender": "female",
    "birth_date": "2005-02-15",
    "phone_number": "081234567894",
    "address": "Jl. Contoh No. 456",
    "class": "XII IPA 3",
    "major": "IPA",
    "school_name": "SMK Negeri 2",
    "photo": "https://example.com/photo2.jpg",
    "bio": "Siswa yang aktif, kreatif, dan berprestasi",
    "created_at": "...",
    "updated_at": "..."
  }
}
```
- Catatan: Butuh token admin

### 5.5 Delete Student
**DELETE** `/api/students/{id}`
- Deskripsi: Hapus student
- Ekspektasi Response (Success):
```json
{
  "status": "success",
  "message": "Student berhasil dihapus"
}
```
- Ekspektasi Response (Error):
```json
{
  "status": "fail",
  "message": "Student tidak ditemukan"
}
```
- Catatan: Butuh token admin

---

## 6. ASSESSMENTS MANAGEMENT (Not Yet Implemented)

**Catatan:** Fitur Assessments Management belum diimplementasikan dalam API. Tabel `assessments` sudah tersedia di database dengan struktur sebagai berikut:

### Struktur Tabel Assessments
```sql
CREATE TABLE assessments (
  id VARCHAR(50) PRIMARY KEY,
  id_student VARCHAR(50) NOT NULL REFERENCES students(id),
  id_program VARCHAR(50) NOT NULL REFERENCES programs(id),
  id_mentor VARCHAR(50) NOT NULL REFERENCES mentors(id),
  final_grade INTEGER NOT NULL CHECK (final_grade >= 0 AND final_grade <= 100),
  final_feedback TEXT NOT NULL,
  final_status VARCHAR(20) NOT NULL DEFAULT 'not_started' CHECK (final_status IN ('finished', 'draw_back', 'not_started')),
  mentor_feedback TEXT,
  assessment_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

### Endpoint yang Direncanakan
- **POST** `/api/assessments` - Create assessment (mentor/admin)
- **GET** `/api/assessments` - Get all assessments (admin)
- **GET** `/api/assessments/{id}` - Get assessment by ID (admin/mentor/student)
- **PUT** `/api/assessments/{id}` - Update assessment (mentor/admin)
- **DELETE** `/api/assessments/{id}` - Delete assessment (admin)
- **GET** `/api/mentors/assessments` - Get assessments by mentor (mentor)
- **GET** `/api/students/assessments` - Get assessments by student (student)

### Business Rules yang Direncanakan
- Mentor hanya bisa mengakses assessment untuk program yang mereka handle
- Student hanya bisa melihat assessment mereka sendiri
- Admin bisa mengakses semua assessment
- Assessment final_status mempengaruhi kemampuan student untuk apply ulang ke program yang sama

---

## 7. HEALTH CHECK

### 7.1 Health Check
**GET** `/health`
- Deskripsi: Mengecek status server
- Ekspektasi Response (Success):
```json
{
  "status": "success",
  "message": "Server is running",
  "timestamp": "..."
}
```

---

## 4A. COMPANY MANAGEMENT

### 4A.1 Register Company
**POST** `/auth/register/company`
- Deskripsi: Register akun company baru (public)
- Request JSON:
```json
{
  "email": "company1@example.com",
  "password": "password123",
  "role": "company",
  "company_name": "PT. Inovasi Digital",
  "company_address": "Jl. Industri No. 1, Jakarta",
  "company_phone": "0211234567",
  "company_email": "info@inovasi.com",
  "company_website": "https://inovasi.com",
  "company_logo": "https://inovasi.com/logo.png",
  "company_description": "Perusahaan teknologi inovatif."
}
```
- Ekspektasi Response (Success):
```json
{
  "status": "success",
  "message": "Company berhasil didaftarkan",
  "data": {
    "accessToken": "...",
    "refreshToken": "...",
    "user": {
      "id": "user-...",
      "email": "company1@example.com",
      "role": "company",
      "company_name": "PT. Inovasi Digital"
    }
  }
}
```
- Ekspektasi Response (Error):
```json
{
  "status": "fail",
  "message": "Email sudah terdaftar"
}
```
- Catatan: Tidak butuh token

### 4A.2 Create Company (Admin Only)
**POST** `/api/companies`
- Deskripsi: Membuat company baru oleh admin
- Request JSON: (sama seperti register, tanpa field role)
```json
{
  "email": "company2@example.com",
  "password": "password123",
  "company_name": "PT. Solusi Cerdas",
  "company_address": "Jl. Teknologi No. 2, Bandung",
  "company_phone": "0221234567",
  "company_email": "info@solusicerdas.com",
  "company_website": "https://solusicerdas.com",
  "company_logo": "https://solusicerdas.com/logo.png",
  "company_description": "Solusi teknologi untuk bisnis."
}
```
- Ekspektasi Response (Success):
```json
{
  "status": "success",
  "message": "Company berhasil dibuat",
  "data": { ... }
}
```
- Ekspektasi Response (Error):
```json
{
  "status": "fail",
  "message": "Email sudah terdaftar"
}
```
- Catatan: Butuh token admin

### 4A.3 Get All Companies (Admin Only)
**GET** `/api/companies?page=1&limit=10&search=&sort_by=created_at&sort_order=desc`
- Deskripsi: Mendapatkan daftar company
- Ekspektasi Response (Success):
```json
{
  "status": "success",
  "message": "Daftar company berhasil diambil",
  "data": [ ... ],
  "pagination": { ... }
}
```
- Catatan: Butuh token admin

### 4A.4 Get Company by ID (Admin Only)
**GET** `/api/companies/{id}`
- Deskripsi: Mendapatkan company berdasarkan ID
- Ekspektasi Response (Success):
```json
{
  "status": "success",
  "message": "Company berhasil ditemukan",
  "data": { ... }
}
```
- Ekspektasi Response (Error):
```json
{
  "status": "fail",
  "message": "Company tidak ditemukan"
}
```
- Catatan: Butuh token admin

### 4A.5 Update Company (Admin Only)
**PUT** `/api/companies/{id}`
- Deskripsi: Update data company
- Request JSON:
```json
{
  "company_name": "PT. Inovasi Digital Updated"
}
```
- Ekspektasi Response (Success):
```json
{
  "status": "success",
  "message": "Company berhasil diupdate",
  "data": { ... }
}
```
- Catatan: Butuh token admin

### 4A.6 Delete Company (Admin Only)
**DELETE** `/api/companies/{id}`
- Deskripsi: Hapus company
- Ekspektasi Response (Success):
```json
{
  "status": "success",
  "message": "Company berhasil dihapus"
}
```
- Catatan: Butuh token admin

### 4A.7 Get Current Company Profile
**GET** `/companies/profile`
- Deskripsi: Mendapatkan profile company yang sedang login
- Ekspektasi Response (Success):
```json
{
  "status": "success",
  "data": {
    "id": "company-...",
    "company_name": "PT. Inovasi Digital",
    "company_address": "Jl. Industri No. 1, Jakarta",
    "company_phone": "0211234567",
    "company_email": "info@inovasi.com",
    "company_website": "https://inovasi.com",
    "company_logo": "https://inovasi.com/logo.png",
    "company_description": "Perusahaan teknologi inovatif.",
    "created_at": "...",
    "updated_at": "..."
  }
}
```
- Catatan: Butuh token company

### 4A.8 Get Mentors by Company
**GET** `/companies/mentors`
- Deskripsi: Mendapatkan daftar mentor milik company yang sedang login
- Ekspektasi Response (Success):
```json
{
  "status": "success",
  "message": "Daftar mentor berhasil diambil",
  "data": [ ... ],
  "pagination": { ... }
}
```
- Catatan: Butuh token company

---

## 4B. PROGRAM MANAGEMENT (Admin & Company)

### 4B.1 Create Program
**POST** `/api/programs`
- Deskripsi: Membuat program baru (admin: any program, company: only their programs)
- Request JSON:
```json
{
  "title": "Program Magang Software Developer",
  "company_name": "PT. Inovasi Digital",
  "description": "Program magang untuk mahasiswa yang ingin belajar pengembangan software dengan teknologi terkini",
  "category": "Software Development",
  "location": "Jakarta",
  "intern_type": "hybrid",
  "duration": "3 bulan",
  "start_date": "2024-02-01",
  "end_date": "2024-05-01",
  "quota": 10,
  "qualification": "Mahasiswa semester 6-8 jurusan Informatika/Teknik Komputer, menguasai dasar pemrograman, familiar dengan JavaScript/Java/Python",
  "benefits": "Sertifikat magang, uang saku, pengalaman kerja nyata, networking dengan profesional IT",
  "status": "open",
  "photo": "https://example.com/program-photo.jpg",
  "id_mentor": "mentor-abc123"
}
```
- Ekspektasi Response (Success):
```json
{
  "status": "success",
  "message": "Program berhasil dibuat",
  "data": {
    "id": "program-...",
    "title": "Program Magang Software Developer",
    "company_name": "PT. Inovasi Digital",
    "description": "Program magang untuk mahasiswa yang ingin belajar pengembangan software dengan teknologi terkini",
    "category": "Software Development",
    "location": "Jakarta",
    "intern_type": "hybrid",
    "duration": "3 bulan",
    "start_date": "2024-02-01",
    "end_date": "2024-05-01",
    "quota": 10,
    "qualification": "Mahasiswa semester 6-8 jurusan Informatika/Teknik Komputer, menguasai dasar pemrograman, familiar dengan JavaScript/Java/Python",
    "benefits": "Sertifikat magang, uang saku, pengalaman kerja nyata, networking dengan profesional IT",
    "status": "open",
    "photo": "https://example.com/program-photo.jpg",
    "id_mentor": "mentor-abc123",
    "id_company": "company-...",
    "created_at": "...",
    "updated_at": "..."
  }
}
```
- Ekspektasi Response (Error):
```json
{
  "status": "fail",
  "message": "Mentor tidak ditemukan"
}
```
- Catatan: Butuh token admin atau company

### 4B.2 Get All Programs
**GET** `/api/programs?page=1&limit=10&search=&sort_by=created_at&sort_order=desc&category=&location=&intern_type=&status=&newest=`
- Deskripsi: Mendapatkan daftar program (admin: all programs, company: only their programs)
- Ekspektasi Response (Success):
```json
{
  "status": "success",
  "message": "Daftar program berhasil diambil",
  "data": [
    {
      "id": "program-...",
      "title": "Program Magang Software Developer",
      "company_name": "PT. Inovasi Digital",
      "description": "Program magang untuk mahasiswa...",
      "category": "Software Development",
      "location": "Jakarta",
      "intern_type": "hybrid",
      "duration": "3 bulan",
      "start_date": "2024-02-01",
      "end_date": "2024-05-01",
      "quota": 10,
      "status": "open",
      "photo": "https://example.com/program-photo.jpg",
      "created_at": "...",
      "updated_at": "..."
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3,
    "hasNext": true,
    "hasPrev": false
  }
}
```
- Catatan: Butuh token admin atau company

### 4B.3 Get Available Programs for Students
**GET** `/api/students/programs?page=1&limit=10&search=&sort_by=created_at&sort_order=desc&category=&location=&intern_type=&newest=`
- Deskripsi: Mendapatkan daftar program yang tersedia untuk student (status open only)
- Ekspektasi Response (Success):
```json
{
  "status": "success",
  "message": "Daftar program tersedia berhasil diambil",
  "data": [
    {
      "id": "program-...",
      "title": "Program Magang Software Developer",
      "company_name": "PT. Inovasi Digital",
      "description": "Program magang untuk mahasiswa...",
      "category": "Software Development",
      "location": "Jakarta",
      "intern_type": "hybrid",
      "duration": "3 bulan",
      "start_date": "2024-02-01",
      "end_date": "2024-05-01",
      "quota": 10,
      "status": "open",
      "photo": "https://example.com/program-photo.jpg",
      "created_at": "...",
      "updated_at": "..."
    }
  ],
  "pagination": { ... }
}
```
- Catatan: Butuh token student

### 4B.4 Get Program by ID
**GET** `/api/programs/{id}`
- Deskripsi: Mendapatkan program berdasarkan ID (admin: any program, company: only their programs)
- Ekspektasi Response (Success):
```json
{
  "status": "success",
  "message": "Program berhasil ditemukan",
  "data": {
    "id": "program-...",
    "title": "Program Magang Software Developer",
    "company_name": "PT. Inovasi Digital",
    "description": "Program magang untuk mahasiswa yang ingin belajar pengembangan software dengan teknologi terkini",
    "category": "Software Development",
    "location": "Jakarta",
    "intern_type": "hybrid",
    "duration": "3 bulan",
    "start_date": "2024-02-01",
    "end_date": "2024-05-01",
    "quota": 10,
    "qualification": "Mahasiswa semester 6-8 jurusan Informatika/Teknik Komputer, menguasai dasar pemrograman, familiar dengan JavaScript/Java/Python",
    "benefits": "Sertifikat magang, uang saku, pengalaman kerja nyata, networking dengan profesional IT",
    "status": "open",
    "photo": "https://example.com/program-photo.jpg",
    "id_mentor": "mentor-abc123",
    "id_company": "company-...",
    "created_at": "...",
    "updated_at": "..."
  }
}
```
- Ekspektasi Response (Error):
```json
{
  "status": "fail",
  "message": "Program tidak ditemukan"
}
```
- Catatan: Butuh token admin atau company

### 4B.5 Update Program
**PUT** `/api/programs/{id}`
- Deskripsi: Update data program (admin: any program, company: only their programs)
- Request JSON:
```json
{
  "title": "Program Magang Software Developer - Updated",
  "status": "closed",
  "quota": 5
}
```
- Ekspektasi Response (Success):
```json
{
  "status": "success",
  "message": "Program berhasil diupdate",
  "data": { ... }
}
```
- Ekspektasi Response (Error):
```json
{
  "status": "fail",
  "message": "Anda tidak memiliki akses ke program ini"
}
```
- Catatan: Butuh token admin atau company

### 4B.6 Delete Program
**DELETE** `/api/programs/{id}`
- Deskripsi: Hapus program (admin: any program, company: only their programs)
- Ekspektasi Response (Success):
```json
{
  "status": "success",
  "message": "Program berhasil dihapus",
  "data": {
    "deleted_at": "..."
  }
}
```
- Ekspektasi Response (Error):
```json
{
  "status": "fail",
  "message": "Anda tidak memiliki akses ke program ini"
}
```
- Catatan: Butuh token admin atau company 

---

## 4C. APPLICATIONS (Student, Company, Admin)

### 4C.1 Create Application (Student Only)
**POST** `/api/applications`
- Deskripsi: Student mendaftar ke program magang
- Request JSON:
```json
{
  "id_program": "program-abc123",
  "cv_url": "https://drive.google.com/file/d/1234567890/view",
  "recommendation_letter_url": "https://drive.google.com/file/d/0987654321/view"
}
```
- Ekspektasi Response (Success):
```json
{
  "status": "success",
  "message": "Aplikasi berhasil dibuat",
  "data": {
    "id": "application-...",
    "id_student": "student-...",
    "id_program": "program-abc123",
    "cv_url": "https://drive.google.com/file/d/1234567890/view",
    "recommendation_letter_url": "https://drive.google.com/file/d/0987654321/view",
    "apply_date": "2024-01-15T10:30:00Z",
    "status": "registered",
    "feedback": null,
    "created_at": "...",
    "updated_at": "..."
  }
}
```
- Ekspektasi Response (Error):
```json
{
  "status": "fail",
  "message": "Program tidak ditemukan atau tidak tersedia"
}
```
- Catatan: Butuh token student

### 4C.2 Get Student Applications (Student Only)
**GET** `/api/students/applications?page=1&limit=10&search=&sort_by=created_at&sort_order=desc&status=&newest=`
- Deskripsi: Mendapatkan daftar aplikasi student yang sedang login
- Ekspektasi Response (Success):
```json
{
  "status": "success",
  "message": "Daftar aplikasi berhasil diambil",
  "data": [
    {
      "id": "application-...",
      "id_student": "student-...",
      "id_program": "program-abc123",
      "cv_url": "https://drive.google.com/file/d/1234567890/view",
      "recommendation_letter_url": "https://drive.google.com/file/d/0987654321/view",
      "apply_date": "2024-01-15T10:30:00Z",
      "status": "registered",
      "feedback": null,
      "created_at": "...",
      "updated_at": "...",
      "program_title": "Program Magang Software Developer",
      "company_name": "PT. Inovasi Digital",
      "student_name": "John Doe",
      "student_nis": "2024001"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 5,
    "totalPages": 1,
    "hasNext": false,
    "hasPrev": false
  }
}
```
- Catatan: Butuh token student

### 4C.3 Get Student Application by ID (Student Only)
**GET** `/api/students/applications/{id}`
- Deskripsi: Mendapatkan detail aplikasi student berdasarkan ID
- Ekspektasi Response (Success):
```json
{
  "status": "success",
  "message": "Detail aplikasi berhasil diambil",
  "data": {
    "id": "application-...",
    "id_student": "student-...",
    "id_program": "program-abc123",
    "cv_url": "https://drive.google.com/file/d/1234567890/view",
    "recommendation_letter_url": "https://drive.google.com/file/d/0987654321/view",
    "apply_date": "2024-01-15T10:30:00Z",
    "status": "registered",
    "feedback": null,
    "created_at": "...",
    "updated_at": "...",
    "program_title": "Program Magang Software Developer",
    "company_name": "PT. Inovasi Digital",
    "student_name": "John Doe",
    "student_nis": "2024001"
  }
}
```
- Ekspektasi Response (Error):
```json
{
  "status": "fail",
  "message": "Aplikasi tidak ditemukan"
}
```
- Catatan: Butuh token student

### 4C.4 Get Company Applications (Company Only)
**GET** `/api/companies/applications?page=1&limit=10&search=&sort_by=created_at&sort_order=desc&status=&newest=`
- Deskripsi: Mendapatkan daftar aplikasi untuk program milik company yang sedang login
- Ekspektasi Response (Success):
```json
{
  "status": "success",
  "message": "Daftar aplikasi berhasil diambil",
  "data": [
    {
      "id": "application-...",
      "id_student": "student-...",
      "id_program": "program-abc123",
      "cv_url": "https://drive.google.com/file/d/1234567890/view",
      "recommendation_letter_url": "https://drive.google.com/file/d/0987654321/view",
      "apply_date": "2024-01-15T10:30:00Z",
      "status": "registered",
      "feedback": null,
      "created_at": "...",
      "updated_at": "...",
      "program_title": "Program Magang Software Developer",
      "company_name": "PT. Inovasi Digital",
      "student_name": "John Doe",
      "student_nis": "2024001"
    }
  ],
  "pagination": { ... }
}
```
- Catatan: Butuh token company

### 4C.5 Get Company Application by ID (Company Only)
**GET** `/api/companies/applications/{id}`
- Deskripsi: Mendapatkan detail aplikasi untuk program milik company berdasarkan ID
- Ekspektasi Response (Success):
```json
{
  "status": "success",
  "message": "Detail aplikasi berhasil diambil",
  "data": {
    "id": "application-...",
    "id_student": "student-...",
    "id_program": "program-abc123",
    "cv_url": "https://drive.google.com/file/d/1234567890/view",
    "recommendation_letter_url": "https://drive.google.com/file/d/0987654321/view",
    "apply_date": "2024-01-15T10:30:00Z",
    "status": "registered",
    "feedback": null,
    "created_at": "...",
    "updated_at": "...",
    "program_title": "Program Magang Software Developer",
    "company_name": "PT. Inovasi Digital",
    "student_name": "John Doe",
    "student_nis": "2024001"
  }
}
```
- Ekspektasi Response (Error):
```json
{
  "status": "fail",
  "message": "Anda tidak memiliki akses ke aplikasi ini"
}
```
- Catatan: Butuh token company

### 4C.6 Update Company Application (Company Only)
**PUT** `/api/companies/applications/{id}`
- Deskripsi: Update status dan feedback aplikasi untuk program milik company
- Request JSON:
```json
{
  "status": "reviewing",
  "feedback": "CV dan surat rekomendasi sudah diterima, sedang dalam proses review"
}
```
- Ekspektasi Response (Success):
```json
{
  "status": "success",
  "message": "Aplikasi berhasil diupdate",
  "data": {
    "id": "application-...",
    "id_student": "student-...",
    "id_program": "program-abc123",
    "cv_url": "https://drive.google.com/file/d/1234567890/view",
    "recommendation_letter_url": "https://drive.google.com/file/d/0987654321/view",
    "apply_date": "2024-01-15T10:30:00Z",
    "status": "reviewing",
    "feedback": "CV dan surat rekomendasi sudah diterima, sedang dalam proses review",
    "created_at": "...",
    "updated_at": "..."
  }
}
```
- Ekspektasi Response (Error):
```json
{
  "status": "fail",
  "message": "Anda tidak memiliki akses ke aplikasi ini"
}
```
- Catatan: Butuh token company

### 4C.7 Get All Applications (Admin Only)
**GET** `/api/applications?page=1&limit=10&search=&sort_by=created_at&sort_order=desc&status=&newest=`
- Deskripsi: Mendapatkan daftar semua aplikasi (admin only)
- Ekspektasi Response (Success):
```json
{
  "status": "success",
  "message": "Daftar aplikasi berhasil diambil",
  "data": [
    {
      "id": "application-...",
      "id_student": "student-...",
      "id_program": "program-abc123",
      "cv_url": "https://drive.google.com/file/d/1234567890/view",
      "recommendation_letter_url": "https://drive.google.com/file/d/0987654321/view",
      "apply_date": "2024-01-15T10:30:00Z",
      "status": "registered",
      "feedback": null,
      "created_at": "...",
      "updated_at": "...",
      "program_title": "Program Magang Software Developer",
      "company_name": "PT. Inovasi Digital",
      "student_name": "John Doe",
      "student_nis": "2024001"
    }
  ],
  "pagination": { ... }
}
```
- Catatan: Butuh token admin

### 4C.8 Get Application by ID (Admin Only)
**GET** `/api/applications/{id}`
- Deskripsi: Mendapatkan detail aplikasi berdasarkan ID (admin only)
- Ekspektasi Response (Success):
```json
{
  "status": "success",
  "message": "Detail aplikasi berhasil diambil",
  "data": {
    "id": "application-...",
    "id_student": "student-...",
    "id_program": "program-abc123",
    "cv_url": "https://drive.google.com/file/d/1234567890/view",
    "recommendation_letter_url": "https://drive.google.com/file/d/0987654321/view",
    "apply_date": "2024-01-15T10:30:00Z",
    "status": "registered",
    "feedback": null,
    "created_at": "...",
    "updated_at": "...",
    "program_title": "Program Magang Software Developer",
    "company_name": "PT. Inovasi Digital",
    "student_name": "John Doe",
    "student_nis": "2024001"
  }
}
```
- Ekspektasi Response (Error):
```json
{
  "status": "fail",
  "message": "Aplikasi tidak ditemukan"
}
```
- Catatan: Butuh token admin

### 4C.9 Update Application (Admin Only)
**PUT** `/api/applications/{id}`
- Deskripsi: Update status dan feedback aplikasi (admin only)
- Request JSON:
```json
{
  "status": "accepted",
  "feedback": "Selamat! Anda diterima untuk program magang ini. Silakan hubungi kami untuk informasi selanjutnya."
}
```
- Ekspektasi Response (Success):
```json
{
  "status": "success",
  "message": "Aplikasi berhasil diupdate",
  "data": {
    "id": "application-...",
    "id_student": "student-...",
    "id_program": "program-abc123",
    "cv_url": "https://drive.google.com/file/d/1234567890/view",
    "recommendation_letter_url": "https://drive.google.com/file/d/0987654321/view",
    "apply_date": "2024-01-15T10:30:00Z",
    "status": "accepted",
    "feedback": "Selamat! Anda diterima untuk program magang ini. Silakan hubungi kami untuk informasi selanjutnya.",
    "created_at": "...",
    "updated_at": "..."
  }
}
```
- Catatan: Butuh token admin

### 4C.10 Get Program Detail for Student
**GET** `/api/students/programs/{id}`
- Deskripsi: Mendapatkan detail program dengan informasi status aplikasi student
- Ekspektasi Response (Success):
```json
{
  "status": "success",
  "message": "Detail program berhasil diambil",
  "data": {
    "id": "program-abc123",
    "title": "Program Magang Software Developer",
    "company_name": "PT. Inovasi Digital",
    "description": "Program magang untuk mahasiswa...",
    "category": "Software Development",
    "location": "Jakarta",
    "intern_type": "hybrid",
    "duration": "3 bulan",
    "start_date": "2024-02-01",
    "end_date": "2024-05-01",
    "quota": 10,
    "qualification": "Mahasiswa semester 6-8...",
    "benefits": "Sertifikat magang, uang saku...",
    "status": "open",
    "photo": "https://example.com/program-photo.jpg",
    "created_at": "...",
    "updated_at": "...",
    "application_status": "registered",
    "can_apply": false,
    "application_id": "application-..."
  }
}
```
- Catatan: Butuh token student 
