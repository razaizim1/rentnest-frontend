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
| User Registration | `RegistrationForm` / `registerForm` | POST | `/api/auth/register` | Public |
| User Login | `SignInFrom` / `singInFrom` | POST | `/api/auth/login` | Public |
| Current User | `getMe` | GET | `/api/users/profile` | Required |
| Refresh Token | `getNewAccessToken` | POST | `/api/auth/refresh-token` | Cookie |
| Logout | `logout` action | Client cookie clear | N/A | Required |

## Property APIs

| Frontend Feature | Frontend Location | HTTP Method | Backend Endpoint | Auth |
|---|---|---:|---|---|
| Property Listing | `getProperties`, `PropertyGrid` | GET | `/api/properties` | Public |
| Property Search | `PropertySearch` + `getProperties` | GET | `/api/properties?search=...` | Public |
| Property Filter | `PropertyFilter` + `getProperties` | GET | `/api/properties?location=&minPrice=&price=&type=&amenities=` | Public |
| Property Pagination | `PropertyPagination` + `getProperties` | GET | `/api/properties?page=&limit=` | Public |
| Property Details | `getProperty` | GET | `/api/properties/:id` | Public |
| Property Reviews | `getPropertyReviews` / `ReviewSection` | GET | `/api/properties/:id/reviews` | Public |
| Categories | `getCategories` | GET | `/api/categories` | Public |

## Tenant APIs

| Frontend Feature | Frontend Location | HTTP Method | Backend Endpoint | Auth |
|---|---|---:|---|---|
| Create Rental Request | `RentalRequestForm` / `createRental` | POST | `/api/rentals` | Tenant |
| My Rental Requests | Tenant Dashboard / `getMyRentals` | GET | `/api/rentals` | Tenant |
| Check Rental Status | `checkRentalStatus` | GET | `/api/check/:propertyId` | Tenant |
| Create Review | `createReview` / `ReviewForm` | POST | `/api/reviews` | Tenant |
| Delete Own Review | `deleteReview` / `ReviewItem` | DELETE | `/api/reviews/:id` | Tenant |

## Payment APIs

| Frontend Feature | Frontend Location | HTTP Method | Backend Endpoint | Auth |
|---|---|---:|---|---|
| Create Stripe Checkout Session | `createPayment` / `PayButton` | POST | `/api/payments/create` | Tenant |
| Stripe Success Redirect | `/payment/success` | GET | Stripe `success_url` | Public |
| Stripe Cancel Redirect | `/payment/cancel` | GET | Stripe `cancel_url` | Public |
| Stripe Webhook | Backend only | POST | `/api/payments/webhook` | Stripe |

## Landlord APIs

| Frontend Feature | Frontend Location | HTTP Method | Backend Endpoint | Auth |
|---|---|---:|---|---|
| Create Property | `CreatePropertyForm` / `createProperty` | POST | `/api/landlord/properties` | Landlord |
| My Properties | `getMyProperties` / `getLandlordProperties` | GET | `/api/landlord/properties` | Landlord |
| Update Property | `EditPropertyForm` / `updateProperty` | PUT | `/api/landlord/properties/:id` | Landlord |
| Availability Toggle | `AvailabilityToggle` | PUT | `/api/landlord/properties/:id` | Landlord |
| Delete Property | `DeletePropertyButton` / `deleteProperty` | DELETE | `/api/landlord/properties/:id` | Landlord |
| Incoming Rental Requests | `getLandlordRequests` | GET | `/api/landlord/requests` | Landlord |
| Approve/Reject Rental Request | `updateRentalRequest` | PATCH | `/api/landlord/requests/:id` | Landlord |

## Admin APIs

| Frontend Feature | Frontend Location | HTTP Method | Backend Endpoint | Auth |
|---|---|---:|---|---|
| Admin User List | `getAdminUsers` / `AdminUserTable` | GET | `/api/admin/users` | Admin |
| Admin User Pagination | Admin Users page | GET | `/api/admin/users?page=&limit=` | Admin |
| Admin User Search | `AdminUserSearch` | GET | `/api/admin/users?search=` | Admin |
| Ban / Unban User | `updateUserStatus` / `AdminUserTable` | PATCH | `/api/admin/users/:id` | Admin |
| Admin Property List | `getAdminProperties` / `AdminPropertyTable` | GET | `/api/admin/properties` | Admin |
| Admin Property Pagination | Admin Properties page | GET | `/api/admin/properties?page=&limit=` | Admin |
| Admin Rental Requests | `getAdminRentals` / `AdminRentalTable` | GET | `/api/admin/rentals` | Admin |

## Request Handling

For authenticated API requests, the frontend reads the access token from the server-side HTTP-only cookie and forwards it as a Bearer token:

```http
Authorization: Bearer <accessToken>
```

## Error Handling

Frontend server actions normalize API failures into a structured result:

```ts
{
  success: false,
  statusCode: 400,
  message: "User-friendly error message"
}
```

Client components display errors with toast notifications, inline validation, `error.tsx`, and `not-found.tsx`.

## Payment Flow

```text
Tenant Dashboard or Property Details
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
