# API Integration

This document maps the RentNest frontend features and components to the backend API endpoints they consume.

## Base URL

The frontend reads the backend URL from the environment variable:

```env
BACKEND_API_URL=https://your-backend-url.com
```

## Authentication

| Frontend Feature | Frontend Location | HTTP Method | Backend Endpoint | Auth |
|---|---|---:|---|---|
| User Registration | Registration Form / `registerForm` | POST | `/api/auth/register` | Public |
| User Login | Login Form / `singInFrom` | POST | `/api/auth/login` | Public |
| Current User | `getMe` | GET | `/api/users/profile` | Required |
| Logout | `logout` action | POST/GET* | Backend logout endpoint | Required |

> *Use the exact HTTP method implemented by the backend logout endpoint.

## Property APIs

| Frontend Feature | Frontend Location | HTTP Method | Backend Endpoint | Auth |
|---|---|---:|---|---|
| Property Listing | `getProperties`, `PropertyGrid` | GET | `/api/properties` | Public |
| Property Search | `PropertySearch` + `getProperties` | GET | `/api/properties?search=...` | Public |
| Property Filter | `PropertyFilter` + `getProperties` | GET | `/api/properties?location=...&price=...&type=...` | Public |
| Property Pagination | `PropertyPagination` + `getProperties` | GET | `/api/properties?page=...&limit=...` | Public |
| Property Details | `getProperty` | GET | `/api/properties/:id` | Public |
| Property Reviews | `getPropertyReviews` / `ReviewSection` | GET | `/api/properties/:id/reviews` | Public |

## Tenant APIs

| Frontend Feature | Frontend Location | HTTP Method | Backend Endpoint | Auth |
|---|---|---:|---|---|
| Create Rental Request | Rental Request Form / rental action | POST | `/api/rentals` | Tenant |
| My Rental Requests | Tenant Dashboard / rental action | GET | `/api/rentals` | Tenant |
| Single Rental Request | Rental details action | GET | `/api/rentals/:id` | Tenant |
| Check Rental Status | `checkRentalStatus` | GET | `/api/rentals/status/:propertyId`* | Tenant |
| Create Review | `createReview` / `ReviewForm` | POST | `/api/reviews` | Tenant |
| Delete Own Review | `deleteReview` / `ReviewItem` | DELETE | `/api/reviews/:id` | Tenant |

> *Use the exact route implemented by the backend for rental-status checking.

## Payment APIs

| Frontend Feature | Frontend Location | HTTP Method | Backend Endpoint | Auth |
|---|---|---:|---|---|
| Create Stripe Checkout Session | `createPayment` / `PayButton` | POST | `/api/payments/create` | Tenant |
| Stripe Success Redirect | `/payment/success` | GET | Stripe redirect URL | N/A |
| Stripe Cancel Redirect | `/payment/cancel` | GET | Stripe redirect URL | N/A |
| Stripe Webhook | Backend only | POST | Configured Stripe webhook endpoint | Stripe |

## Landlord APIs

| Frontend Feature | Frontend Location | HTTP Method | Backend Endpoint | Auth |
|---|---|---:|---|---|
| Create Property | `CreatePropertyForm` / `createProperty` | POST | `/api/landlord/properties` | Landlord |
| My Properties | `getMyProperties` | GET | `/api/landlord/properties` | Landlord |
| Update Property | Edit Property form / `updateProperty` | PUT | `/api/landlord/properties/:id` | Landlord |
| Delete Property | `DeletePropertyButton` / `deleteProperty` | DELETE | `/api/landlord/properties/:id` | Landlord |
| Incoming Rental Requests | `getLandlordRequests` | GET | `/api/landlord/rentals`* | Landlord |
| Approve/Reject Rental Request | `updateRentalRequest` | PATCH/PUT* | `/api/landlord/rentals/:id`* | Landlord |

> *Use the exact endpoint and HTTP method implemented by the backend if it differs from the examples above.

## Admin APIs

| Frontend Feature | Frontend Location | HTTP Method | Backend Endpoint | Auth |
|---|---|---:|---|---|
| Admin User List | `getAdminUsers` / `AdminUserTable` | GET | `/api/admin/users` | Admin |
| Admin User Pagination | `AdminUsersPage` | GET | `/api/admin/users?page=...&limit=...` | Admin |
| Admin User Search | Admin Users page | GET | `/api/admin/users?search=...` | Admin |
| Ban / Unban User | `updateUserStatus` / `AdminUserTable` | PATCH | `/api/admin/users/:id` | Admin |
| Admin Property List | `getAdminProperties` / `AdminPropertyTable` | GET | `/api/admin/properties` | Admin |
| Admin Property Pagination | Admin Properties page | GET | `/api/admin/properties?page=...&limit=...` | Admin |
| Admin Rental Requests | `getAdminRentals` / `AdminRentalTable` | GET | `/api/admin/rentals` | Admin |

## Request Handling

For authenticated API requests, the frontend reads the access token from the server-side HTTP-only cookie and forwards it as a Bearer token:

```http
Authorization: Bearer <accessToken>
```

## Error Handling

Frontend server actions normalize API failures into a structured result where applicable:

```ts
{
  success: false,
  statusCode: 400,
  message: "User-friendly error message"
}
```

Client components display user-facing errors using toast notifications and inline validation messages where appropriate.

## Caching and Revalidation

Public property data may use Next.js caching/revalidation where appropriate. After landlord mutations, affected routes are revalidated so updated property data can appear in listing and details pages.

## Payment Flow

```text
Tenant Dashboard
      ↓
Pay Now
      ↓
POST /api/payments/create
      ↓
Stripe Checkout
      ↓
Success → /payment/success
Cancel  → /payment/cancel
      ↓
Backend Stripe Webhook updates payment state
```

## Role Summary

| Role | Main Frontend API Areas |
|---|---|
| Tenant | Auth, Properties, Rentals, Reviews, Payments |
| Landlord | Properties CRUD, Rental Requests |
| Admin | Users, Properties, Rental Requests |

