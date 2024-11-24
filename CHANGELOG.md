# Changelog
All notable changes to this project will be documented in this file.

## [0.3.0] - 2024-03-24

### Added
- Firestore integration for all components
  - QuestionDetail component with real-time updates
  - Question listing with Firestore pagination
  - Message threading preparation
  - ExpertService with CRUD operations
- Composite indexes for complex queries
  - status + submittedAt
  - assignedTo + submittedAt
  - providerId + submittedAt
  - userId + submittedAt

### Changed
- Migrated from local data to Firestore
  - Removed tickets.ts
  - Removed experts.ts
- Updated all dashboard components to use Firestore
  - AdminDashboard
  - ExpertDashboard
  - ConsumerDashboard
  - ProviderDashboard
- Enhanced question filtering and sorting
- Added fallback queries for index building

### Removed
- Local data stores
  - tickets.ts
  - experts.ts
- Static data handling methods

## [0.2.0] - 2024-03-24

### Added
- Firestore data migration script
  - Migrated tickets to questions collection
  - Created message subcollections
  - Migrated experts collection
- Firestore security rules with role-based access

### Changed
- Improved project structure and organization
- Organized scripts into migrations folder

### Technical
- Added migration documentation

## [0.1.0] - 2024-03-23
### Added
- Initial project setup with Vite and TypeScript
- Firebase configuration and hosting
- GitHub Actions workflow for automated deployments
- Environment variables configuration
- Mobile-responsive development setup
- Initial MVP version
- Basic project structure
- Firebase project connection

### Technical
- TypeScript coverage at 98.1%
- Configured proper .gitignore patterns
- Set up secure environment handling 