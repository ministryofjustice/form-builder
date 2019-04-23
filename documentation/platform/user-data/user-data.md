# User data

## How Runner handles user data

- User data is stored encrypted
  - userId
  - userToken
  - SERVICE_SECRET
- Only runner has access to SERVICE_SECRET

[Diagram showing how Runner handles user data](user-data--sequence.md)

---

## How backend handles user data

- [User datastore API](user-datastore--api.md)
- [User datastore - threats and mitigation](user-datastore--threats.md)

## User file uploads

- [File uploads](../file-upload/file-upload.md)