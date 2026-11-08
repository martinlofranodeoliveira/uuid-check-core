# Design — uuid-check-core

One strict shape regex after prefix/brace stripping; version and variant
read off fixed nibble positions (no lookup tables). Generation delegates
to the platform CSPRNG — the library never implements randomness itself.

Oracle: documented v4 fixture, nil UUID, urn/brace forms, plus live
generation round-trips (validate(generateV4()) is v4/rfc4122, unique).
No v1/v6 time semantics, no namespace (v3/v5) derivation.
