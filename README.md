# E-commerce Microservices Backend

Bu proje, modern e-ticaret uygulaması için mikroservis mimarisi kullanılarak geliştirilmiş bir backend sistemidir.

## 🏗️ Mimari Yapı

```
ecommerce-backend/
├── apps/
│   ├── auth-service/          # Kimlik doğrulama servisi
│   ├── customer-service/      # Müşteri yönetimi servisi
│   ├── product-service/       # Ürün yönetimi servisi (gelecek)
│   ├── order-service/         # Sipariş yönetimi servisi (gelecek)
│   ├── payment-service/       # Ödeme servisi (gelecek)
│   ├── inventory-service/     # Stok yönetimi servisi (gelecek)
│   └── notification-service/  # Bildirim servisi (gelecek)
├── common/                    # Ortak kullanılan kodlar
├── infra/                     # Altyapı konfigürasyonları
└── docs/                      # Dokümantasyon
```

## 🚀 Servisler

### Auth Service (Port: 3001)
- Kullanıcı kaydı ve girişi
- JWT token yönetimi
- Kimlik doğrulama middleware'i

**Endpoints:**
- `POST /api/auth/register` - Kullanıcı kaydı
- `POST /api/auth/login` - Kullanıcı girişi
- `GET /health` - Sağlık kontrolü

### Customer Service (Port: 4002)
- Müşteri bilgileri yönetimi
- CRUD operasyonları

**Endpoints:**
- `GET /api/customers` - Tüm müşterileri listele
- `GET /api/customers/:id` - Müşteri detayı
- `POST /api/customers` - Yeni müşteri oluştur
- `PUT /api/customers/:id` - Müşteri güncelle
- `DELETE /api/customers/:id` - Müşteri sil
- `GET /health` - Sağlık kontrolü

## 🛠️ Teknolojiler

- **Runtime:** Node.js 18+
- **Language:** TypeScript
- **Framework:** Express.js
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** JWT
- **Containerization:** Docker
- **API Documentation:** Swagger (gelecek)

## 📋 Gereksinimler

- Node.js 18+
- Docker & Docker Compose
- PostgreSQL

## 🚀 Kurulum

### 1. Repository'yi klonlayın
```bash
git clone <repository-url>
cd ecommerce-backend
```

### 2. Environment dosyalarını oluşturun

**Auth Service (.env):**
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/auth_db"
JWT_SECRET="your-super-secret-jwt-key-here"
JWT_EXPIRES_IN="24h"
PORT=3001
NODE_ENV=development
```

**Customer Service (.env):**
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/customer_db"
PORT=4002
NODE_ENV=development
```

### 3. Docker ile çalıştırın
```bash
# Tüm servisleri başlat
docker-compose up -d

# Logları izle
docker-compose logs -f

# Servisleri durdur
docker-compose down
```

### 4. Manuel kurulum (geliştirme için)

```bash
# Auth Service
cd apps/auth-service
npm install
npx prisma generate
npx prisma db push
npm run dev

# Customer Service (yeni terminal)
cd apps/customer-service
npm install
npx prisma generate
npx prisma db push
npm run dev
```

## 🧪 Test

```bash
# Auth Service test
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"123456"}'

# Customer Service test
curl -X POST http://localhost:4002/api/customers \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","phone":"+1234567890"}'
```

## 📊 Health Checks

- Auth Service: `http://localhost:3001/health`
- Customer Service: `http://localhost:4002/health`

## 🔧 Geliştirme

### Yeni servis ekleme
1. `apps/` dizininde yeni servis klasörü oluştur
2. `package.json` ve `tsconfig.json` dosyalarını kopyala
3. `docker-compose.yml`'a servis ekle
4. Prisma schema oluştur
5. Controller, Service ve Route dosyalarını ekle

### Mikroservis Best Practices
- ✅ Her servis kendi veritabanına sahip
- ✅ Loose coupling (gevşek bağlantı)
- ✅ Health check endpoints
- ✅ Error handling
- ✅ Input validation
- ✅ Security middleware (CORS, Helmet)
- ✅ Docker containerization
- ✅ Environment configuration

## 📝 TODO

- [ ] API Gateway implementasyonu
- [ ] Service Discovery (Consul/Eureka)
- [ ] Circuit Breaker pattern
- [ ] Distributed tracing (Jaeger)
- [ ] Centralized logging (ELK Stack)
- [ ] API Documentation (Swagger)
- [ ] Unit ve Integration testler
- [ ] CI/CD pipeline
- [ ] Monitoring ve Alerting
- [ ] Rate limiting
- [ ] Caching (Redis)

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. 