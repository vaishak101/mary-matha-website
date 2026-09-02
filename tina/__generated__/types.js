export function gql(strings, ...args) {
  let str = "";
  strings.forEach((string, i) => {
    str += string + (args[i] || "");
  });
  return str;
}
export const FeaturedPropertyPartsFragmentDoc = gql`
    fragment FeaturedPropertyParts on FeaturedProperty {
  __typename
  title
  tag
  description
  price
  areaSqft
  propertyType
  bedrooms
  bathrooms
  locality
  possession
  facing
  gallery {
    __typename
    image
    alt
  }
  featured
  order
}
    `;
export const OngoingProjectPartsFragmentDoc = gql`
    fragment OngoingProjectParts on OngoingProject {
  __typename
  title
  description
  location
  projectType
  percentComplete
  expectedCompletion
  gallery {
    __typename
    image
    alt
  }
  videoUrl
  order
}
    `;
export const CompletedProjectPartsFragmentDoc = gql`
    fragment CompletedProjectParts on CompletedProject {
  __typename
  title
  description
  location
  projectType
  completedYear
  durationMonths
  gallery {
    __typename
    image
    alt
  }
  videoUrl
  order
}
    `;
export const StatsPartsFragmentDoc = gql`
    fragment StatsParts on Stats {
  __typename
  items {
    __typename
    value
    label
  }
}
    `;
export const TestimonialPartsFragmentDoc = gql`
    fragment TestimonialParts on Testimonial {
  __typename
  quote
  name
  location
  service
  order
}
    `;
export const FeaturedPropertyDocument = gql`
    query featuredProperty($relativePath: String!) {
  featuredProperty(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...FeaturedPropertyParts
  }
}
    ${FeaturedPropertyPartsFragmentDoc}`;
export const FeaturedPropertyConnectionDocument = gql`
    query featuredPropertyConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: FeaturedPropertyFilter) {
  featuredPropertyConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...FeaturedPropertyParts
      }
    }
  }
}
    ${FeaturedPropertyPartsFragmentDoc}`;
export const OngoingProjectDocument = gql`
    query ongoingProject($relativePath: String!) {
  ongoingProject(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...OngoingProjectParts
  }
}
    ${OngoingProjectPartsFragmentDoc}`;
export const OngoingProjectConnectionDocument = gql`
    query ongoingProjectConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: OngoingProjectFilter) {
  ongoingProjectConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...OngoingProjectParts
      }
    }
  }
}
    ${OngoingProjectPartsFragmentDoc}`;
export const CompletedProjectDocument = gql`
    query completedProject($relativePath: String!) {
  completedProject(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...CompletedProjectParts
  }
}
    ${CompletedProjectPartsFragmentDoc}`;
export const CompletedProjectConnectionDocument = gql`
    query completedProjectConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: CompletedProjectFilter) {
  completedProjectConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...CompletedProjectParts
      }
    }
  }
}
    ${CompletedProjectPartsFragmentDoc}`;
export const StatsDocument = gql`
    query stats($relativePath: String!) {
  stats(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...StatsParts
  }
}
    ${StatsPartsFragmentDoc}`;
export const StatsConnectionDocument = gql`
    query statsConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: StatsFilter) {
  statsConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...StatsParts
      }
    }
  }
}
    ${StatsPartsFragmentDoc}`;
export const TestimonialDocument = gql`
    query testimonial($relativePath: String!) {
  testimonial(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...TestimonialParts
  }
}
    ${TestimonialPartsFragmentDoc}`;
export const TestimonialConnectionDocument = gql`
    query testimonialConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: TestimonialFilter) {
  testimonialConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...TestimonialParts
      }
    }
  }
}
    ${TestimonialPartsFragmentDoc}`;
export function getSdk(requester) {
  return {
    featuredProperty(variables, options) {
      return requester(FeaturedPropertyDocument, variables, options);
    },
    featuredPropertyConnection(variables, options) {
      return requester(FeaturedPropertyConnectionDocument, variables, options);
    },
    ongoingProject(variables, options) {
      return requester(OngoingProjectDocument, variables, options);
    },
    ongoingProjectConnection(variables, options) {
      return requester(OngoingProjectConnectionDocument, variables, options);
    },
    completedProject(variables, options) {
      return requester(CompletedProjectDocument, variables, options);
    },
    completedProjectConnection(variables, options) {
      return requester(CompletedProjectConnectionDocument, variables, options);
    },
    stats(variables, options) {
      return requester(StatsDocument, variables, options);
    },
    statsConnection(variables, options) {
      return requester(StatsConnectionDocument, variables, options);
    },
    testimonial(variables, options) {
      return requester(TestimonialDocument, variables, options);
    },
    testimonialConnection(variables, options) {
      return requester(TestimonialConnectionDocument, variables, options);
    }
  };
}
import { createClient } from "tinacms/dist/client";
const generateRequester = (client) => {
  const requester = async (doc, vars, options) => {
    let url = client.apiUrl;
    if (options?.branch) {
      const index = client.apiUrl.lastIndexOf("/");
      url = client.apiUrl.substring(0, index + 1) + options.branch;
    }
    const data = await client.request({
      query: doc,
      variables: vars,
      url
    }, options);
    return { data: data?.data, errors: data?.errors, query: doc, variables: vars || {} };
  };
  return requester;
};
export const ExperimentalGetTinaClient = () => getSdk(
  generateRequester(
    createClient({
      url: "http://localhost:4001/graphql",
      queries
    })
  )
);
export const queries = (client) => {
  const requester = generateRequester(client);
  return getSdk(requester);
};
