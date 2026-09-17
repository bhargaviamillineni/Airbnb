"use client";

import { useCallback, useState } from "react";

import { Amenities } from "@/components/listing/Amenities";
import { BookingWidget } from "@/components/listing/BookingWidget";
import { Calendar } from "@/components/listing/Calendar";
import { Description } from "@/components/listing/Description";
import { Divider } from "@/components/ui/Divider";
import { GuestFavoriteBadge } from "@/components/listing/GuestFavoriteBadge";
import { HeroGrid } from "@/components/listing/HeroGrid";
import { Highlights } from "@/components/listing/Highlights";
import { HostIntro } from "@/components/listing/HostIntro";
import { HostProfile } from "@/components/listing/HostProfile";
import { HouseRules } from "@/components/listing/HouseRules";
import { ListingHeader } from "@/components/listing/ListingHeader";
import { ListingTitleBar } from "@/components/listing/ListingTitleBar";
import { MapSection } from "@/components/listing/MapSection";
import { Navbar } from "@/components/listing/Navbar";
import { Reviews } from "@/components/listing/Reviews";
import { SiteFooter } from "@/components/listing/SiteFooter";
import { SimilarListings } from "@/components/listing/SimilarListings";
import { SleepingArrangements } from "@/components/listing/SleepingArrangements";
import {
  LISTING_SECTION_IDS,
  StickySectionNav,
} from "@/components/listing/StickySectionNav";
import { LightboxOverlay } from "@/components/lightbox/LightboxOverlay";
import { PhotoTourOverlay } from "@/components/photo-tour/PhotoTourOverlay";
import { listingData } from "@/data/listing-data";
import { dateFromYmd, type DateRange } from "@/lib/dates";
import { useStickySectionNav } from "@/hooks/useStickySectionNav";

const INITIAL_RANGE: DateRange = {
  start: dateFromYmd(2026, 9, 18),
  end: dateFromYmd(2026, 9, 23),
};

export function ListingPage() {
  const {
    title,
    photos,
    host,
    highlights,
    amenities,
    totalAmenities,
    sleepingArrangements,
    reviews,
    ratingCategories,
    ratingChips,
    pricing,
    location,
    locationShort,
    neighbourhoodHighlights,
    policies,
    nearbyStays,
    description,
    descriptionOriginal,
    rating,
    reviewCount,
    guestCapacity,
    isGuestFavorite,
    ratingDistribution,
    photoTourSections,
  } = listingData;

  const [saved, setSaved] = useState(false);
  const [guests, setGuests] = useState(pricing.guests);
  const [range, setRange] = useState<DateRange>(INITIAL_RANGE);
  const [photoTourOpen, setPhotoTourOpen] = useState(false);
  const [photoTourInitialIndex, setPhotoTourInitialIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const { visible, activeId } = useStickySectionNav(LISTING_SECTION_IDS);

  const openPhotoTour = useCallback((index: number) => {
    setPhotoTourInitialIndex(Math.max(0, index));
    setPhotoTourOpen(true);
  }, []);

  return (
    <>
      <Navbar />
      <StickySectionNav
        visible={visible}
        activeId={activeId}
        pricePerNight={pricing.pricePerNight}
        currency={pricing.currency}
        range={range}
      />

      <main id="main">
        <div className="mx-auto max-w-[var(--layout-max-width)] px-[var(--layout-content-padding)] pb-16">
          <ListingTitleBar
            title={title}
            saved={saved}
            onToggleSave={() => setSaved((value) => !value)}
          />
          <HeroGrid
            photos={photos}
            totalPhotos={photos.length}
            onOpenPhoto={openPhotoTour}
          />

          <div className="mt-12 flex gap-[var(--layout-main-gap)]">
            <div className="min-w-0 flex-1">
              <ListingHeader listing={listingData} />
              {isGuestFavorite ? (
                <div className="mt-8">
                  <GuestFavoriteBadge
                    rating={rating}
                    reviewCount={reviewCount}
                  />
                </div>
              ) : null}
              <HostIntro listing={listingData} host={host} />
              <Divider />
              <Highlights highlights={highlights} />
              <Divider />
              <Description
                text={description}
                originalText={descriptionOriginal}
              />
              <Divider />
              <SleepingArrangements arrangements={sleepingArrangements} />
              <Divider />
              <Amenities amenities={amenities} totalCount={totalAmenities} />
              <Divider />
              <Calendar
                location={locationShort.split(",")[0] ?? locationShort}
                range={range}
                onRangeChange={setRange}
              />
            </div>
            <div>
              <div id="bookingWidgetSentinel" aria-hidden="true" className="h-px w-0" />
              <BookingWidget
                pricePerNight={pricing.pricePerNight}
                currency={pricing.currency}
                range={range}
                guests={guests}
                maxGuests={guestCapacity}
                onGuestsChange={setGuests}
                stickySentinelId="bookingWidgetSentinel"
              />
            </div>
          </div>

          <Divider />
          <Reviews
            rating={rating}
            reviewCount={reviewCount}
            categories={ratingCategories}
            chips={ratingChips}
            reviews={reviews}
            ratingDistribution={ratingDistribution}
          />
          <Divider />
          <MapSection
            location={location}
            neighbourhoodHighlights={neighbourhoodHighlights}
          />
          <Divider />
          <HostProfile host={host} />
          <Divider />
          <HouseRules policies={policies} />
          <Divider />
          <SimilarListings location={location} stays={nearbyStays} />
        </div>
      </main>
      <SiteFooter />

      <PhotoTourOverlay
        isOpen={photoTourOpen}
        photos={photos}
        photoTourSections={photoTourSections}
        initialIndex={photoTourInitialIndex}
        onClose={() => {
          setLightboxIndex(null);
          setPhotoTourOpen(false);
        }}
        onSelectPhoto={setLightboxIndex}
        trapEnabled={photoTourOpen && lightboxIndex === null}
      />
      <LightboxOverlay
        photos={photos}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onIndexChange={setLightboxIndex}
      />
    </>
  );
}
