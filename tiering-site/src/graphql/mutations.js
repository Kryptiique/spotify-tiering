/* eslint-disable */
// this is an auto generated file. This will be overwritten


// /** Modify only the comment of the image */
// export const commentOnImage = `mutation CommentOnImage($input: UpdateImageInput!) {
//   updateImage(input: $input) {
//     id
//     comment
//   }
// }`



/** Modify only the rating of and Image model*/
export const rateImage = `mutation Comment ($input UpdateImageInput!){
  updateImage(input: $input){
    id
    rating
  }
}`
export const removeDupe = `mutation Comment ($input UpdateImageInput!){
  updateImage(input: $input){
    id
    imageDupePairId
  }
}`

export const updateImage = `mutation UpdateImage($input: UpdateImageInput!) {
  updateImage(input: $input) {
    id
    name
    url
    comments{
      items {
        id
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
      }
      duplicate {
        id
      }
    }
    batch {
      id
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
export const deleteImage = `mutation DeleteImage($input: DeleteImageInput!) {
  deleteImage(input: $input) {
    id
  }
}
`;
export const createView = `mutation CreateView($input: CreateViewInput!) {
  createView(input: $input) {
    id
    image {
      id
      name
      url
      
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
export const updateView = `mutation UpdateView($input: UpdateViewInput!) {
  updateView(input: $input) {
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
export const deleteView = `mutation DeleteView($input: DeleteViewInput!) {
  deleteView(input: $input) {
    id
  }
}
`;


export const createComment = `mutation CreateComment($input: CreateCommentInput!) {
  createComment(input: $input) {
    id
    image {
      id
    }
    date
  }
}
`;
export const updateComment = `mutation UpdateComment($input: UpdateCommentInput!) {
  updateComment(input: $input) {
    id
    image {
      id
    }
    date
  }
}
`;
export const deleteComment = `mutation DeleteComment($input: DeleteCommentInput!) {
  deleteComment(input: $input) {
    id
  }
}
`;
export const createDuplicatePair = `mutation CreateDuplicatePair($input: CreateDuplicatePairInput!) {
  createDuplicatePair(input: $input) {
    id
    original {
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
    duplicate {
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
  }
}
`;
export const updateDuplicatePair = `mutation UpdateDuplicatePair($input: UpdateDuplicatePairInput!) {
  updateDuplicatePair(input: $input) {
    id
    original {
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
    duplicate {
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
  }
}
`;
export const deleteDuplicatePair = `mutation DeleteDuplicatePair($input: DeleteDuplicatePairInput!) {
  deleteDuplicatePair(input: $input) {
    id
  }
}
`;
export const createTag = `mutation CreateTag($input: CreateTagInput!) {
  createTag(input: $input) {
    id
    name
    category
    images {
      items {
        id
  }
}
`;
export const updateTag = `mutation UpdateTag($input: UpdateTagInput!) {
  updateTag(input: $input) {
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
export const deleteTag = `mutation DeleteTag($input: DeleteTagInput!) {
  deleteTag(input: $input) {
    id
  }
}
`;
export const createBatch = `mutation CreateBatch($input: CreateBatchInput!) {
  createBatch(input: $input) {
    id
    date
  }
}`
export const deleteBatch = `mutation DeleteBatch($input: DeleteBatchInput!) {
  deleteBatch(input: $input) {
    id
  }
}
`;
export const createImageTag = `mutation CreateImageTag($input: CreateImageTagInput!) {
  createImageTag(input: $input) {
    id
    image {
      id
    }
    tag {
      id
      name
      category
    }
  }
}
`;
export const deleteImageTag = `mutation DeleteImageTag($input: DeleteImageTagInput!) {
  deleteImageTag(input: $input) {
    id
  }
}
`;
