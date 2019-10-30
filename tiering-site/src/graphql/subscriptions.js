/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateImage = `subscription OnCreateImage {
  onCreateImage {
    id
    name
    url
    comments{
      items {
        id
        date
      }
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
    dupePair {
      id
      original {
        id
        name
        url
        comments{
          items {
            id
            date
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
        comments{
          items {
            id
            date
          }
        }
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
export const onUpdateImage = `subscription OnUpdateImage {
  onUpdateImage {
    id
    name
    url
    comments{
      items {
        id
        date
      }
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
    dupePair {
      id
      original {
        id
        name
        url
        comments{
          items {
            id
            date
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
        comments{
          items {
            id
            date
          }
        }
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
export const onDeleteImage = `subscription OnDeleteImage {
  onDeleteImage {
    id
    name
    url
    comments{
      items {
        id
        date
      }
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
    dupePair {
      id
      original {
        id
        name
        url
        comments{
          items {
            id
            date
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
        comments{
          items {
            id
            date
          }
        }
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
export const onCreateView = `subscription OnCreateView {
  onCreateView {
    id
    image {
      id
      name
      url
      comments{
          items {
            id
            date
          }
        }
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
export const onUpdateView = `subscription OnUpdateView {
  onUpdateView {
    id
    image {
      id
      name
      url
      comments{
          items {
            id
            date
          }
        }
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
export const onDeleteView = `subscription OnDeleteView {
  onDeleteView {
    id
    image {
      id
      name
      url
      comments{
          items {
            id
            date
          }
        }
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
export const onCreateDuplicatePair = `subscription OnCreateDuplicatePair {
  onCreateDuplicatePair {
    id
    original {
      id
      name
      url
      comments{
          items {
            id
            date
          }
        }
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
    duplicate {
      id
      name
      url
      comments{
          items {
            id
            date
          }
        }
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
  }
}
`;
export const onUpdateDuplicatePair = `subscription OnUpdateDuplicatePair {
  onUpdateDuplicatePair {
    id
    original {
      id
      name
      url
      comments{
          items {
            id
            date
          }
        }
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
    duplicate {
      id
      name
      url
      comments{
          items {
            id
            date
          }
        }
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
  }
}
`;
export const onDeleteDuplicatePair = `subscription OnDeleteDuplicatePair {
  onDeleteDuplicatePair {
    id
    original {
      id
      name
      url
      comments{
          items {
            id
            date
          }
        }
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
    duplicate {
      id
      name
      url
      comments{
          items {
            id
            date
          }
        }
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
  }
}
`;
export const onCreateTag = `subscription OnCreateTag {
  onCreateTag {
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
export const onUpdateTag = `subscription OnUpdateTag {
  onUpdateTag {
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
export const onDeleteTag = `subscription OnDeleteTag {
  onDeleteTag {
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
export const onCreateBatch = `subscription OnCreateBatch {
  onCreateBatch {
    id
    date
    images {
      items {
        id
        name
        url
        comments{
          items {
            id
            date
          }
        }
        rating
        lastRated
        dateDownloaded
      }
      nextToken
    }
  }
}
`;
export const onUpdateBatch = `subscription OnUpdateBatch {
  onUpdateBatch {
    id
    date
    images {
      items {
        id
        name
        url
        comments{
          items {
            id
            date
          }
        }
        rating
        lastRated
        dateDownloaded
      }
      nextToken
    }
  }
}
`;
export const onDeleteBatch = `subscription OnDeleteBatch {
  onDeleteBatch {
    id
    date
    images {
      items {
        id
        name
        url
        comments{
          items {
            id
            date
          }
        }
        rating
        lastRated
        dateDownloaded
      }
      nextToken
    }
  }
}
`;
export const onCreateImageTag = `subscription OnCreateImageTag {
  onCreateImageTag {
    id
    image {
      id
      name
      url
      comments{
          items {
            id
            date
          }
        }
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
    tag {
      id
      name
      category
      count
      images {
        nextToken
      }
    }
  }
}
`;
export const onDeleteImageTag = `subscription OnDeleteImageTag {
  onDeleteImageTag {
    id
    image {
      id
      name
      url
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
    tag {
      id
      name
      category
      count
      images {
        nextToken
      }
    }
  }
}
`;
