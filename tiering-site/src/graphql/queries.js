/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getImage = `query GetImage($id: ID!) {
  getImage(id: $id) {
    id
    name
    url
    o_loc
    comment
    rating
    lastRated
    dateDownloaded
    matches {
      items {
        id
      }
      nextToken
    }
    dupePair {
      id
      original {
        id
        name
        url
        comment
        rating
        lastRated
        dateDownloaded
      }
      duplicate {
        id
        name
        url
        comment
        rating
        lastRated
        dateDownloaded
      }
    }
    batch {
      id
      date
      images {
        nextToken
      }
    }
    views {
      items {
        id
        date
      }
      nextToken
    }
    tags {
      items {
        id
      }
      nextToken
    }
  }
}
`;

/**
 * Gets all the tags in the databas
 */
export const allTags = `query AllTags(
  $filter: ModelTagFilterInput
  $limit: Int
  $nextToken: String
) {
  listTags(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name 
      category
      images {
        items {
          id
        }
      }
    }
  }
}`

export const browseImages = `query ListImages(
  $filter: ModelImageFilterInput
  $limit: Int
  $nextToken: String
) {
  listImages(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      batch {
        id
      }
      name
      url
      o_loc
      comments {
        items {
          id
          date
        }
        nextToken
      }
      rating
      lastRated
      dateDownloaded
      matches {
        items {
          id
        }
        nextToken
      }
      views {
        items {
          id
          date
        }
        nextToken
      }
      tags {
        items {
          id
          tag {
            id
          }
        }
        nextToken
      }
    }
    nextToken
  }
}
`;
export const getView = `query GetView($id: ID!) {
  getView(id: $id) {
    id
    image {
      id
      name
      url
      comment
      rating
      lastRated
      dateDownloaded
      matches {
        nextToken
      }
      dupePair {
        id
      }
      batch {
        id
        date
      }
      views {
        nextToken
      }
      tags {
        nextToken
      }
    }
    date
  }
}
`;
export const listViews = `query ListViews(
  $filter: ModelViewFilterInput
  $limit: Int
  $nextToken: String
) {
  listViews(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      image {
        id
        name
        url
        o_loc
        comment
        rating
        lastRated
        dateDownloaded
      }
      date
    }
    nextToken
  }
}
`;
export const getDuplicatePair = `query GetDuplicatePair($id: ID!) {
  getDuplicatePair(id: $id) {
    id
    original {
      id
      name
      url
      o_loc
      rating
      comments {
        items {
          id
        }
      }
      matches {
        nextToken
      }
      dupePair {
        id
      }
      batch {
        id
        date
      }
      views {
        nextToken
      }
      tags {
        nextToken
      }
    }
    duplicate {
      id
      name
      url
      
      dateDownloaded
      matches {
        nextToken
      }
      dupePair {
        id
      }
      batch {
        id
        date
      }
      views {
        nextToken
      }
      tags {
        nextToken
      }
    }
  }
}
`;
export const listDuplicatePairs = `query ListDuplicatePairs(
  $filter: ModelDuplicatePairFilterInput
  $limit: Int
  $nextToken: String
) {
  listDuplicatePairs(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      original {
        id
        name
        url
        o_loc
        comments{
          items {
            id
          }
        }
        rating
        lastRated
        dateDownloaded
      }
      duplicate {
        id
        name
        url
        comment
        rating
        lastRated
        dateDownloaded
      }
    }
    nextToken
  }
}
`;
export const getTag = `query GetTag($id: ID!) {
  getTag(id: $id) {
    id
    name
    category
    count
    images {
      items {
        id
      }
      nextToken
    }
  }
}
`;
export const listTags = `query ListTags($filter: ModelTagFilterInput, $limit: Int, $nextToken: String) {
  listTags(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      category
      count
      images {
        nextToken
      }
    }
    nextToken
  }
}
`;
export const getBatch = `query GetBatch($id: ID!) {
  getBatch(id: $id) {
    id
    date
    images {
      items {
        id
        name
        url
        o_loc
        comments {
          items {
            id
          }
          nextToken
        }
        rating
        lastRated
        dateDownloaded

        matches {
          items {
            id
          }
          nextToken
        }
        views {
          items {
            id
            date
          }
          nextToken
        }
        tags {
          items {
            id
            tag {
              id
            }
          }
          nextToken
        }
      }
      nextToken
    }
  }
}
`;

export const listBatchs = `query ListBatchs(
  $filter: ModelBatchFilterInput
  $limit: Int
  $nextToken: String
) {
  listBatchs(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      date
      images {
        items {
          id
          name
          url
          o_loc
          comments {
            items {
              id
            }
            nextToken
          }

          matches {
            items {
              id
            }
            nextToken
          }
          views {
            items {
              id
              date
            }
            nextToken
          }
          tags {
            items {
              id
              tag {
                id
              }
            }
            nextToken
          }

          rating
          lastRated
          dateDownloaded
        }
        nextToken
      }
    }
    nextToken
  }
}
`;

/** peeks at all the batches without resolving the images */
// export const peekBatches = `query peekBatches(
//   $filter: ModelBatchFilterInput
//   $limit: Int
//   $nextToken: String
// ) {
//   listBatchs(filter: $filter, limit: $limit, nextToken: $nextToken) {
//     items {
//       id
//       date
//     }
//   }
// }`

export const getImageTag = `query GetImageTag($id: ID!) {
  getImageTag(id: $id) {
    id
    image {
      id
    }
    tag {
      id
    }
}
`;
export const listImageTags = `query ListImageTags(
  $filter: ModelImageTagFilterInput
  $limit: Int
  $nextToken: String
) {
  listImageTags(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      image {
        id
        
      }
      tag {
        id
      }
    }
    nextToken
  }
}
`;
