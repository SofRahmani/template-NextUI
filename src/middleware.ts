import { chain } from './middleware/chain'
import { withI18nMiddleware } from './middleware/withI18nMiddleware'

export default chain([withI18nMiddleware])

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};