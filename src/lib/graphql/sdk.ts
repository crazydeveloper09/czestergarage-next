/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import { GraphQLClient, type RequestOptions } from 'graphql-request';
import gql from 'graphql-tag';
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
export type IconEnum =
  | 'BATTERY'
  | 'Clock'
  | 'DIAGNOSTICS'
  | 'OIL_FILTER'
  | 'PARTS'
  | 'SUSPENSION'
  | 'TIMING_BELT'
  | 'TOW_HITCH'
  | 'car'
  | 'envelope'
  | 'map'
  | 'phone'
  | 'shield'
  | 'snowflake'
  | 'star'
  | 'tag'
  | 'tire'
  | 'user'
  | 'wrench';

export type AboutSectionFieldsFragment = { id: string, title: string, content: string, image: { url: string, width: number | null, height: number | null }, stats: Array<{ value: string, label: string, description: string }> };

export type BenefitFieldsFragment = { text: string, icon: IconEnum };

export type ContactBadgeElementFieldsFragment = { title: string, icon: IconEnum, description: string };

export type ContactInfoFieldsFragment = { items: Array<{ title: string, icon: IconEnum, description: string }> };

export type CtaSectionFieldsFragment = { id: string, title: string, subtitle: string, link: { label: string, href: string, openInNewTab: boolean | null }, backgroundImage: { url: string, width: number | null, height: number | null } };

export type FaqItemFieldsFragment = { question: string, answer: string };

export type FaqSectionFieldsFragment = { title: string, items: Array<{ question: string, answer: string }> };

export type FooterColumnFieldsFragment = { title: string, links: Array<{ label: string, href: string, openInNewTab: boolean | null }> };

export type GallerySectionFieldsFragment = { title: string, images: Array<{ url: string }> };

export type HeroBadgeFieldsFragment = { text: string, icon: IconEnum };

export type HeroSectionFieldsFragment = { title: string, label: string, description: string, image: { url: string }, primaryButton: { label: string, href: string, openInNewTab: boolean | null } | null, secondaryButton: { label: string, href: string, openInNewTab: boolean | null } | null, badges: Array<{ text: string, icon: IconEnum }> };

export type LinkFieldsFragment = { label: string, href: string, openInNewTab: boolean | null };

export type NavigationFieldsFragment = { logo: { url: string }, items: Array<{ label: string, href: string, openInNewTab: boolean | null }>, cta: { label: string, href: string, openInNewTab: boolean | null } };

export type OpeningHourFieldsFragment = { day: string | null, hours: string };

export type PageFieldsFragment = { title: string, slug: string | null, sections: Array<
    | { __typename: 'AboutSection', id: string, title: string, content: string, image: { url: string, width: number | null, height: number | null }, stats: Array<{ value: string, label: string, description: string }> }
    | { __typename: 'ContactInfo', items: Array<{ title: string, icon: IconEnum, description: string }> }
    | { __typename: 'CtaSection', id: string, title: string, subtitle: string, link: { label: string, href: string, openInNewTab: boolean | null }, backgroundImage: { url: string, width: number | null, height: number | null } }
    | { __typename: 'FaqSection', title: string, items: Array<{ question: string, answer: string }> }
    | { __typename: 'HeroSection', title: string, label: string, description: string, image: { url: string }, primaryButton: { label: string, href: string, openInNewTab: boolean | null } | null, secondaryButton: { label: string, href: string, openInNewTab: boolean | null } | null, badges: Array<{ text: string, icon: IconEnum }> }
    | { __typename: 'ReviewsSection', title: string }
    | { __typename: 'ServicesSection', id: string, title: string, subtitle: string, services: Array<{ id: string, title: string, slug: string | null, description: string, icon: IconEnum | null, shortDescription: string, featured: boolean, prizeFrom: number | null, duration: string, heroImage: { url: string } | null, gallery: Array<{ url: string }>, benefits: Array<{ text: string, icon: IconEnum }>, subservices: Array<{ name: string, price: string }> }> }
  >, seo: { title: string, description: string | null } | null };

export type ServiceFieldsFragment = { id: string, title: string, slug: string | null, description: string, icon: IconEnum | null, shortDescription: string, featured: boolean, prizeFrom: number | null, duration: string, heroImage: { url: string } | null, gallery: Array<{ url: string }>, benefits: Array<{ text: string, icon: IconEnum }>, subservices: Array<{ name: string, price: string }> };

export type ServicesSectionFieldsFragment = { id: string, title: string, subtitle: string, services: Array<{ id: string, title: string, slug: string | null, description: string, icon: IconEnum | null, shortDescription: string, featured: boolean, prizeFrom: number | null, duration: string, heroImage: { url: string } | null, gallery: Array<{ url: string }>, benefits: Array<{ text: string, icon: IconEnum }>, subservices: Array<{ name: string, price: string }> }> };

export type StatFieldsFragment = { value: string, label: string, description: string };

export type SubservicesFieldsFragment = { name: string, price: string };

export type FooterQueryVariables = Exact<{ [key: string]: never; }>;


export type FooterQuery = { footer: { description: string, copyright: string, address: string, phone: string, email: string, columns: Array<{ title: string, links: Array<{ label: string, href: string, openInNewTab: boolean | null }> }>, logo: { url: string }, realization: { label: string, href: string, openInNewTab: boolean | null }, openingHours: { day: string | null, hours: string } } | null };

export type NavigationQueryVariables = Exact<{ [key: string]: never; }>;


export type NavigationQuery = { navigation: { logo: { url: string }, items: Array<{ label: string, href: string, openInNewTab: boolean | null }>, cta: { label: string, href: string, openInNewTab: boolean | null } } | null };

export type PageBySlugQueryVariables = Exact<{
  slug: string;
}>;


export type PageBySlugQuery = { page: { title: string, slug: string | null, sections: Array<
      | { __typename: 'AboutSection', id: string, title: string, content: string, image: { url: string, width: number | null, height: number | null }, stats: Array<{ value: string, label: string, description: string }> }
      | { __typename: 'ContactInfo', items: Array<{ title: string, icon: IconEnum, description: string }> }
      | { __typename: 'CtaSection', id: string, title: string, subtitle: string, link: { label: string, href: string, openInNewTab: boolean | null }, backgroundImage: { url: string, width: number | null, height: number | null } }
      | { __typename: 'FaqSection', title: string, items: Array<{ question: string, answer: string }> }
      | { __typename: 'HeroSection', title: string, label: string, description: string, image: { url: string }, primaryButton: { label: string, href: string, openInNewTab: boolean | null } | null, secondaryButton: { label: string, href: string, openInNewTab: boolean | null } | null, badges: Array<{ text: string, icon: IconEnum }> }
      | { __typename: 'ReviewsSection', title: string }
      | { __typename: 'ServicesSection', id: string, title: string, subtitle: string, services: Array<{ id: string, title: string, slug: string | null, description: string, icon: IconEnum | null, shortDescription: string, featured: boolean, prizeFrom: number | null, duration: string, heroImage: { url: string } | null, gallery: Array<{ url: string }>, benefits: Array<{ text: string, icon: IconEnum }>, subservices: Array<{ name: string, price: string }> }> }
    >, seo: { title: string, description: string | null } | null } | null };

export type ServiceBySlugQueryVariables = Exact<{
  slug: string;
}>;


export type ServiceBySlugQuery = { service: { id: string, title: string, slug: string | null, description: string, icon: IconEnum | null, shortDescription: string, featured: boolean, prizeFrom: number | null, duration: string, faq: Array<{ question: string, answer: string }>, seo: { title: string, description: string | null } | null, heroImage: { url: string } | null, gallery: Array<{ url: string }>, benefits: Array<{ text: string, icon: IconEnum }>, subservices: Array<{ name: string, price: string }> } | null };

export type WorkshopGalleryQueryVariables = Exact<{ [key: string]: never; }>;


export type WorkshopGalleryQuery = { gallerySections: Array<{ title: string, images: Array<{ url: string }> }> };

export const LinkFieldsFragmentDoc = gql`
    fragment LinkFields on Link {
  label
  href
  openInNewTab
}
    `;
export const FooterColumnFieldsFragmentDoc = gql`
    fragment FooterColumnFields on FooterColumn {
  title
  links {
    ...LinkFields
  }
}
    ${LinkFieldsFragmentDoc}`;
export const GallerySectionFieldsFragmentDoc = gql`
    fragment GallerySectionFields on GallerySection {
  title
  images {
    url
  }
}
    `;
export const NavigationFieldsFragmentDoc = gql`
    fragment NavigationFields on Navigation {
  logo {
    url
  }
  items {
    ...LinkFields
  }
  cta {
    ...LinkFields
  }
}
    ${LinkFieldsFragmentDoc}`;
export const OpeningHourFieldsFragmentDoc = gql`
    fragment OpeningHourFields on OpeningHour {
  day
  hours
}
    `;
export const HeroBadgeFieldsFragmentDoc = gql`
    fragment HeroBadgeFields on HeroBadge {
  text
  icon
}
    `;
export const HeroSectionFieldsFragmentDoc = gql`
    fragment HeroSectionFields on HeroSection {
  title
  label
  description
  image {
    url
  }
  primaryButton {
    ...LinkFields
  }
  secondaryButton {
    ...LinkFields
  }
  badges {
    ...HeroBadgeFields
  }
}
    ${LinkFieldsFragmentDoc}
${HeroBadgeFieldsFragmentDoc}`;
export const ContactBadgeElementFieldsFragmentDoc = gql`
    fragment ContactBadgeElementFields on ContactBadgeElement {
  title
  icon
  description
}
    `;
export const ContactInfoFieldsFragmentDoc = gql`
    fragment ContactInfoFields on ContactInfo {
  items {
    ...ContactBadgeElementFields
  }
}
    ${ContactBadgeElementFieldsFragmentDoc}`;
export const CtaSectionFieldsFragmentDoc = gql`
    fragment CtaSectionFields on CtaSection {
  id
  title
  subtitle
  link {
    ...LinkFields
  }
  backgroundImage {
    url
    width
    height
  }
}
    ${LinkFieldsFragmentDoc}`;
export const BenefitFieldsFragmentDoc = gql`
    fragment BenefitFields on Benefit {
  text
  icon
}
    `;
export const SubservicesFieldsFragmentDoc = gql`
    fragment SubservicesFields on Subservice {
  name
  price
}
    `;
export const ServiceFieldsFragmentDoc = gql`
    fragment ServiceFields on Service {
  id
  title
  slug
  description
  icon
  shortDescription
  heroImage {
    url
  }
  gallery {
    url
  }
  featured
  prizeFrom
  duration
  benefits {
    ...BenefitFields
  }
  subservices {
    ...SubservicesFields
  }
}
    ${BenefitFieldsFragmentDoc}
${SubservicesFieldsFragmentDoc}`;
export const ServicesSectionFieldsFragmentDoc = gql`
    fragment ServicesSectionFields on ServicesSection {
  id
  title
  subtitle
  services(first: 100) {
    ...ServiceFields
  }
}
    ${ServiceFieldsFragmentDoc}`;
export const StatFieldsFragmentDoc = gql`
    fragment StatFields on Stat {
  value
  label
  description
}
    `;
export const AboutSectionFieldsFragmentDoc = gql`
    fragment AboutSectionFields on AboutSection {
  id
  title
  content
  image {
    url
    width
    height
  }
  stats {
    ...StatFields
  }
}
    ${StatFieldsFragmentDoc}`;
export const FaqItemFieldsFragmentDoc = gql`
    fragment FaqItemFields on FaqItem {
  question
  answer
}
    `;
export const FaqSectionFieldsFragmentDoc = gql`
    fragment FaqSectionFields on FaqSection {
  title
  items {
    ...FaqItemFields
  }
}
    ${FaqItemFieldsFragmentDoc}`;
export const PageFieldsFragmentDoc = gql`
    fragment PageFields on Page {
  title
  slug
  sections {
    __typename
    ... on HeroSection {
      ...HeroSectionFields
    }
    ... on ContactInfo {
      ...ContactInfoFields
    }
    ... on CtaSection {
      ...CtaSectionFields
    }
    ... on ServicesSection {
      ...ServicesSectionFields
    }
    ... on AboutSection {
      ...AboutSectionFields
    }
    ... on FaqSection {
      ...FaqSectionFields
    }
    ... on ReviewsSection {
      title
    }
  }
  seo {
    title
    description
  }
}
    ${HeroSectionFieldsFragmentDoc}
${ContactInfoFieldsFragmentDoc}
${CtaSectionFieldsFragmentDoc}
${ServicesSectionFieldsFragmentDoc}
${AboutSectionFieldsFragmentDoc}
${FaqSectionFieldsFragmentDoc}`;
export const FooterDocument = gql`
    query Footer {
  footer(where: {title: "Główna stopka"}) {
    columns {
      ...FooterColumnFields
    }
    logo {
      url
    }
    description
    copyright
    address
    phone
    email
    realization {
      ...LinkFields
    }
    openingHours {
      ...OpeningHourFields
    }
  }
}
    ${FooterColumnFieldsFragmentDoc}
${LinkFieldsFragmentDoc}
${OpeningHourFieldsFragmentDoc}`;
export const NavigationDocument = gql`
    query Navigation {
  navigation(where: {title: "Główna nawigacja"}) {
    logo {
      url
    }
    items {
      ...LinkFields
    }
    cta {
      ...LinkFields
    }
  }
}
    ${LinkFieldsFragmentDoc}`;
export const PageBySlugDocument = gql`
    query PageBySlug($slug: String!) {
  page(stage: PUBLISHED, where: {slug: $slug}) {
    ...PageFields
  }
}
    ${PageFieldsFragmentDoc}`;
export const ServiceBySlugDocument = gql`
    query ServiceBySlug($slug: String!) {
  service(stage: PUBLISHED, where: {slug: $slug}) {
    ...ServiceFields
    faq {
      ...FaqItemFields
    }
    seo {
      title
      description
    }
  }
}
    ${ServiceFieldsFragmentDoc}
${FaqItemFieldsFragmentDoc}`;
export const WorkshopGalleryDocument = gql`
    query WorkshopGallery {
  gallerySections(stage: PUBLISHED, where: {title: "Galeria warsztatu"}, first: 1) {
    ...GallerySectionFields
  }
}
    ${GallerySectionFieldsFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    Footer(variables?: FooterQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<FooterQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<FooterQuery>({ document: FooterDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'Footer', 'query', variables);
    },
    Navigation(variables?: NavigationQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<NavigationQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<NavigationQuery>({ document: NavigationDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'Navigation', 'query', variables);
    },
    PageBySlug(variables: PageBySlugQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<PageBySlugQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<PageBySlugQuery>({ document: PageBySlugDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'PageBySlug', 'query', variables);
    },
    ServiceBySlug(variables: ServiceBySlugQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<ServiceBySlugQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ServiceBySlugQuery>({ document: ServiceBySlugDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'ServiceBySlug', 'query', variables);
    },
    WorkshopGallery(variables?: WorkshopGalleryQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<WorkshopGalleryQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<WorkshopGalleryQuery>({ document: WorkshopGalleryDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'WorkshopGallery', 'query', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;