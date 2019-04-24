# Error responses

All error responses should be sent as `json` and take the form

```json
{
  "code": {number},
  "name": "{string}",
  ...
  [optional properties]
}
```

eg. when rejecting files containing viruses

```json
{
  "code": 400,
  "name": "invalid.virus"
}
```