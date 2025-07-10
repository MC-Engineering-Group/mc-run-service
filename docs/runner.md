# 🏃 Runner API Documentation

---

## 📌 Create Runner

**Endpoint**: `POST /api/runner`

**Headers**:

- `Authorization`: `Bearer <token>`

**Request Body**:

```json
{
  "name": "John Doe",
  "run_type": "Marathon",
  "last_scanned": "2025-07-10T09:00:00Z" // optional, nullable
}
```

**Response**:

```json
{
  "status": 201,
  "message": "Runner created successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "run_type": "Marathon",
    "last_scanned": "2025-07-10T09:00:00Z",
    "createdAt": "2025-07-10T09:00:01Z",
    "updatedAt": "2025-07-10T09:00:01Z"
  },
  "error": null
}
```

---

## 📌 Get All Runners

**Endpoint**: `GET /api/runner`

**Headers**:

- `Authorization`: `Bearer <token>`

**Response**:

```json
{
  "status": 200,
  "message": "All runners retrieved",
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "run_type": "Marathon",
      "last_scanned": "2025-07-10T09:00:00Z",
      "createdAt": "2025-07-10T09:00:01Z",
      "updatedAt": "2025-07-10T09:00:01Z"
    }
  ],
  "error": null
}
```

---

## 📌 Get One Runner

**Endpoint**: `GET /api/runner/:id`

**Headers**:

- `Authorization`: `Bearer <token>`

**Response**:

```json
{
  "status": 200,
  "message": "Runner found",
  "data": {
    "id": 1,
    "name": "John Doe",
    "run_type": "Marathon",
    "last_scanned": "2025-07-10T09:00:00Z",
    "createdAt": "2025-07-10T09:00:01Z",
    "updatedAt": "2025-07-10T09:00:01Z"
  },
  "error": null
}
```

---

## 📌 Update Runner

**Endpoint**: `PUT /api/runner/:id`

**Headers**:

- `Authorization`: `Bearer <token>`

**Request Body** (partial update allowed):

```json
{
  "name": "Jane Doe",
  "run_type": "Sprint",
  "last_scanned": "2025-07-11T12:00:00Z"
}
```

**Response**:

```json
{
  "status": 200,
  "message": "Runner updated successfully",
  "data": {
    "id": 1,
    "name": "Jane Doe",
    "run_type": "Sprint",
    "last_scanned": "2025-07-11T12:00:00Z",
    "createdAt": "2025-07-10T09:00:01Z",
    "updatedAt": "2025-07-11T12:00:00Z"
  },
  "error": null
}
```

---

## 📌 Delete Runner

**Endpoint**: `DELETE /api/runner/:id`

**Headers**:

- `Authorization`: `Bearer <token>`

**Response**:

```json
{
  "status": 200,
  "message": "Runner deleted successfully",
  "data": null,
  "error": null
}
```

---

## 📌 Update Last Scanned (Scan BIB)

**Endpoint**: `PUT /api/runner/scan-bib/:bib`

**Headers**:

- `Authorization`: `Bearer <token>`

**Behavior**:

- Menyimpan `last_scanned` runner dengan waktu saat ini.

**Response**:

```json
{
  "status": 200,
  "message": "Last scanned updated",
  "data": {
    "id": 1,
    "name": "John Doe",
    "run_type": "Marathon",
    "last_scanned": "2025-07-10T10:15:00Z",
    "createdAt": "2025-07-10T09:00:01Z",
    "updatedAt": "2025-07-10T10:15:00Z"
  },
  "error": null
}
```

---

## 📌 Get Runner With Latest Scan

**Endpoint**: `GET /api/runner/last-scanned`

**Headers**:

- `Authorization`: `Bearer <token>`

**Behavior**:

- Mengambil runner dengan `last_scanned` terbaru (descending).

**Response**:

```json
{
  "status": 200,
  "message": "Latest scanned runner found",
  "data": {
    "id": 2,
    "name": "Jane Doe",
    "run_type": "Sprint",
    "last_scanned": "2025-07-11T14:00:00Z",
    "createdAt": "2025-07-10T11:00:00Z",
    "updatedAt": "2025-07-11T14:00:00Z"
  },
  "error": null
}
```
