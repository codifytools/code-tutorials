import React from "react";
import { Helmet } from "react-helmet";
import { Meteor } from "meteor/meteor";

export default SEO = ({ title, description, path, image }) => (
  <Helmet>
    <title>{title}</title>
    <link rel="canonical" href={Meteor.absoluteUrl(path)} />
    <meta name="description" content={description} />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image:src" content={image} />
    <meta property="og:title" content={title} />
    <meta property="og:url" content={Meteor.absoluteUrl(path)} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image} />
  </Helmet>
);